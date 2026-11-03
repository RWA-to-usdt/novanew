import { useState } from 'react';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

export default function WalletModal({ isOpen, onClose, connectWallet }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const WALLETCONNECT_PROJECT_ID = "0204ba9ef8f8856cd275da139b717e8a";

  if (!isOpen) return null;

  // Pure WalletConnect Trigger Function
  const handleWalletConnect = async () => {
    setIsConnecting(true);
    try {
      const wcProvider = await EthereumProvider.init({
        projectId: WALLETCONNECT_PROJECT_ID,
        chains: [1],
        showQrModal: true,
        metadata: {
          name: 'NovaSwap',
          description: 'NovaSwap Decentralized Exchange',
          url: window.location.origin,
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
        },
      });

      await wcProvider.connect();
      await connectWallet('walletconnect', wcProvider);
      onClose();
    } catch (error) {
      console.error('WalletConnect Error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-[#111827] border border-[#1F293D] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1F293D] flex justify-between items-center bg-[#151D2F]">
          <div>
            <h3 className="text-lg font-bold text-white">Connect Wallet</h3>
            <p className="text-xs text-gray-400 mt-0.5">Scan or select mobile wallet</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-[#1F293D] text-gray-400 hover:text-white flex items-center justify-center text-lg"
            disabled={isConnecting}
          >
            &times;
          </button>
        </div>

        {/* WalletConnect Button Only */}
        <div className="p-6">
          <button
            onClick={handleWalletConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-2xl shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            <span className="text-2xl">🌐</span>
            <span>Connect with WalletConnect</span>
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">
            Connect using Trust Wallet, MetaMask Mobile, Rainbow, or any Web3 Mobile Wallet.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F293D] bg-[#151D2F] text-center text-[11px] text-gray-400">
          By connecting, you agree to <span className="text-blue-400">NovaSwap Terms of Service</span>.
        </div>

      </div>
    </div>
  );
}