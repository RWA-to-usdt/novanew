import { useState } from 'react';
import { 
  FaWallet, FaEthereum, FaBitcoin, FaTelegram, FaDiscord, 
  FaShieldAlt, FaGhost, FaAtom, FaCalculator, FaRocket,
  FaCreditCard, FaInfinity, FaImage, FaBrick, FaUnicorn, FaLeaf
} from 'react-icons/fa';
import { SiTrustwallet, SiCoinbase, SiBinance, SiLedger, SiTrezor, SiOkx, SiPhantom } from 'react-icons/si';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  // Wallet 25ක ලිස්ට් එක
  const wallets = [
    { name: 'MetaMask', icon: '🦊', type: 'metamask', color: 'orange' },
    { name: 'Trust Wallet', icon: <SiTrustwallet />, type: 'trust', color: 'blue' },
    { name: 'Coinbase Wallet', icon: <SiCoinbase />, type: 'coinbase', color: 'blue' },
    { name: 'Binance Wallet', icon: <SiBinance />, type: 'binance', color: 'yellow' },
    { name: 'Rabby Wallet', icon: '🐰', type: 'rabby', color: 'purple' },
    { name: 'OKX Wallet', icon: <SiOkx />, type: 'okx', color: 'gray' },
    { name: 'Ledger', icon: <SiLedger />, type: 'ledger', color: 'gray' },
    { name: 'Trezor', icon: <SiTrezor />, type: 'trezor', color: 'gray' },
    { name: 'TON Wallet', icon: <FaTelegram />, type: 'ton', color: 'blue' },
    { name: 'Phantom', icon: <SiPhantom />, type: 'phantom', color: 'purple' },
    { name: 'Keplr', icon: <FaAtom />, type: 'keplr', color: 'blue' },
    { name: 'Math Wallet', icon: <FaCalculator />, type: 'math', color: 'blue' },
    { name: 'SafePal', icon: <FaShieldAlt />, type: 'safepal', color: 'green' },
    { name: 'TokenPocket', icon: <FaWallet />, type: 'tokenpocket', color: 'blue' },
    { name: 'imToken', icon: <FaEthereum />, type: 'imtoken', color: 'blue' },
    { name: 'BitKeep', icon: <FaBitcoin />, type: 'bitkeep', color: 'orange' },
    { name: 'Coin98', icon: '🟩', type: 'coin98', color: 'green' },
    { name: 'Zerion', icon: <FaUnicorn />, type: 'zerion', color: 'pink' },
    { name: 'Frontier', icon: <FaRocket />, type: 'frontier', color: 'purple' },
    { name: 'D\'CENT', icon: <FaCreditCard />, type: 'dcent', color: 'blue' },
    { name: 'XDEFI', icon: <FaShieldAlt />, type: 'xdefi', color: 'blue' },
    { name: 'Taho', icon: '🦊', type: 'taho', color: 'orange' },
    { name: 'Frame', icon: <FaImage />, type: 'frame', color: 'gray' },
    { name: 'BlockWallet', icon: <FaBrick />, type: 'blockwallet', color: 'gray' },
    { name: 'Infinity Wallet', icon: <FaInfinity />, type: 'infinity', color: 'blue' },
  ];

  const handleConnect = async (walletType) => {
    setIsConnecting(true);
    if (window.ethereum) {
      await connectWallet();
    } else {
      openWalletApp(walletType);
    }
    setIsConnecting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        <div className="p-4 border-b border-[#293249] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Connect a Wallet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.type)}
              disabled={isConnecting}
              className="flex items-center space-x-3 p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className={`w-8 h-8 rounded-full bg-${wallet.color}-500/20 flex items-center justify-center text-${wallet.color}-500 text-lg`}>
                {wallet.icon}
              </div>
              <span className="font-semibold text-white text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-[#293249] text-center text-xs text-gray-500">
          By connecting a wallet, you agree to NovaSwap Terms of Service.
        </div>
      </div>
    </div>
  );
}