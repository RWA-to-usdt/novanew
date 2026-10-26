import { useState } from 'react';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const wallets = [
    { name: 'MetaMask', icon: '🦊', type: 'metamask' },
    { name: 'Trust Wallet', icon: '🛡️', type: 'trust' },
    { name: 'Coinbase Wallet', icon: '🔵', type: 'coinbase' },
    { name: 'Binance Wallet', icon: '🟡', type: 'binance' },
    { name: 'Rabby Wallet', icon: '🐰', type: 'rabby' },
    { name: 'OKX Wallet', icon: '⭕', type: 'okx' },
    { name: 'Ledger', icon: '🔐', type: 'ledger' },
    { name: 'Trezor', icon: '🔑', type: 'trezor' },
    { name: 'TON Wallet', icon: '💎', type: 'ton' },
    { name: 'Phantom', icon: '👻', type: 'phantom' },
    { name: 'Keplr', icon: '⚛️', type: 'keplr' },
    { name: 'Math Wallet', icon: '🧮', type: 'math' },
    { name: 'SafePal', icon: '🛡️', type: 'safepal' },
    { name: 'TokenPocket', icon: '👛', type: 'tokenpocket' },
    { name: 'imToken', icon: '🔷', type: 'imtoken' },
    { name: 'BitKeep', icon: '🔶', type: 'bitkeep' },
    { name: 'Coin98', icon: '🟩', type: 'coin98' },
    { name: 'Zerion', icon: '🦄', type: 'zerion' },
    { name: 'Frontier', icon: '🚀', type: 'frontier' },
    { name: "D'CENT", icon: '💳', type: 'dcent' },
    { name: 'XDEFI', icon: '🛡️', type: 'xdefi' },
    { name: 'Taho', icon: '🦊', type: 'taho' },
    { name: 'Frame', icon: '🖼️', type: 'frame' },
    { name: 'BlockWallet', icon: '🧱', type: 'blockwallet' },
    { name: 'Infinity Wallet', icon: '♾️', type: 'infinity' },
  ];

  // Browser එකේ තියෙන Specific Wallet Provider එක තෝරාගැනීම
  const getSpecificProvider = (walletType) => {
    if (typeof window === 'undefined' || !window.ethereum) return null;

    const eth = window.ethereum;

    // Multiple wallet extensions install කර ඇති විට (window.ethereum.providers array එක)
    if (eth.providers && Array.isArray(eth.providers)) {
      if (walletType === 'metamask') return eth.providers.find((p) => p.isMetaMask && !p.isRabby);
      if (walletType === 'rabby') return eth.providers.find((p) => p.isRabby);
      if (walletType === 'coinbase') return eth.providers.find((p) => p.isCoinbaseWallet);
      if (walletType === 'trust') return eth.providers.find((p) => p.isTrust || p.isTrustWallet);
      if (walletType === 'okx') return eth.providers.find((p) => p.isOkxWallet || p.isOKXWallet);
      if (walletType === 'bitkeep') return eth.providers.find((p) => p.isBitKeep);
      if (walletType === 'binance') return eth.providers.find((p) => p.isBinance);
      if (walletType === 'phantom') return window.phantom?.ethereum || eth.providers.find((p) => p.isPhantom);
    }

    // Single Provider Injection එකක් ඇති විට Direct Checks
    if (walletType === 'rabby' && eth.isRabby) return eth;
    if (walletType === 'metamask' && eth.isMetaMask && !eth.isRabby) return eth;
    if (walletType === 'coinbase' && (eth.isCoinbaseWallet || window.coinbaseWalletExtension)) return eth;
    if (walletType === 'trust' && (eth.isTrust || eth.isTrustWallet)) return eth;
    if (walletType === 'okx' && (eth.isOkxWallet || window.okxwallet)) return eth;
    if (walletType === 'phantom' && (window.phantom?.ethereum || eth.isPhantom)) return window.phantom?.ethereum || eth;

    // Direct Window Object Checks (Non-EVM / Specific Extensions)
    if (walletType === 'keplr' && window.keplr) return window.keplr;
    if (walletType === 'phantom' && window.solana) return window.solana;

    return null;
  };

  const handleConnect = async (walletType) => {
    setIsConnecting(true);

    try {
      const selectedProvider = getSpecificProvider(walletType);

      if (selectedProvider) {
        // Specific Extension Provider එකක් තිබේ නම් එයින් Connect කරන්න
        await connectWallet(walletType, selectedProvider);
      } else {
        // Extension එක Browser එකේ නැත්නම් DeepLink / WalletConnect / App View එක Call කරන්න
        if (typeof openWalletApp === 'function') {
          await openWalletApp(walletType);
        } else {
          console.warn(`No provider found for ${walletType} and openWalletApp is not defined.`);
        }
      }
    } catch (error) {
      console.error(`Error connecting to ${walletType}:`, error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        <div className="p-4 border-b border-[#293249] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Connect a Wallet</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-xl"
            disabled={isConnecting}
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.type)}
              disabled={isConnecting}
              className="flex items-center space-x-3 p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white text-lg">
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