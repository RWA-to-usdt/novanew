import { FaWallet } from 'react-icons/fa';

export default function WalletModal({ isOpen, onClose, connectWallet, detectedWallets }) {
  if (!isOpen) return null;

  const handleConnect = async (provider) => {
    await connectWallet(provider);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-sm rounded-2xl shadow-2xl p-6 relative max-h-[80vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Connect a wallet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="space-y-3">
          {detectedWallets.length > 0 ? (
            detectedWallets.map((wallet) => (
              <button 
                key={wallet.info.uuid} 
                onClick={() => handleConnect(wallet.provider)} 
                className="w-full flex items-center space-x-4 p-4 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition"
              >
                <img src={wallet.info.icon} alt={wallet.info.name} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-white">{wallet.info.name}</span>
              </button>
            ))
          ) : (
            <div className="text-center text-gray-400 text-sm py-8">
              <p>No wallets detected.</p>
              <p className="text-xs mt-2">Please install MetaMask or another wallet extension.</p>
            </div>
          )}
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          By connecting a wallet, you agree to NovaSwap Terms of Service.
        </p>
      </div>
    </div>
  );
}