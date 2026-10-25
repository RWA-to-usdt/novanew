import { useState } from 'react';
import { FaWallet } from 'react-icons/fa';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setIsConnecting(true);
    await connectWallet();
    setIsConnecting(false);
  };

  // Extension එකක් තියෙනවා නම් (PC) කෙලින්ම connect වෙනවා
  // නැත්නම් (Mobile) App එකට යවනවා
  const handleMobileConnect = (walletType) => {
    if (window.ethereum) {
      handleConnect();
    } else {
      openWalletApp(walletType);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-sm rounded-2xl shadow-2xl p-6 relative">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Connect a wallet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="space-y-3">
          {/* MetaMask */}
          <button 
            onClick={() => handleMobileConnect('metamask')} 
            disabled={isConnecting} 
            className="w-full flex items-center space-x-4 p-4 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-xl">🦊</div>
            <span className="font-semibold text-white">{isConnecting ? 'Connecting...' : 'MetaMask'}</span>
          </button>
          
          {/* Trust Wallet */}
          <button 
            onClick={() => handleMobileConnect('trust')} 
            disabled={isConnecting} 
            className="w-full flex items-center space-x-4 p-4 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xl"><FaWallet /></div>
            <span className="font-semibold text-white">{isConnecting ? 'Connecting...' : 'Trust Wallet'}</span>
          </button>
          
          {/* Coinbase */}
          <button 
            onClick={() => handleMobileConnect('coinbase')} 
            disabled={isConnecting} 
            className="w-full flex items-center space-x-4 p-4 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 text-xl">🛡️</div>
            <span className="font-semibold text-white">{isConnecting ? 'Connecting...' : 'Coinbase Wallet'}</span>
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          By connecting a wallet, you agree to NovaSwap Terms of Service.
        </p>
      </div>
    </div>
  );
}