import { useState, useEffect } from 'react';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [detectedWallets, setDetectedWallets] = useState([]);

  // Browser එකේ තියෙන wallets අහුලන්න
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detected = [];
    const eth = window.ethereum;

    if (eth) {
      if (eth.providers && Array.isArray(eth.providers)) {
        eth.providers.forEach(p => {
          if (p.isMetaMask && !p.isRabby) detected.push('metamask');
          if (p.isRabby) detected.push('rabby');
          if (p.isCoinbaseWallet) detected.push('coinbase');
          if (p.isTrust || p.isTrustWallet) detected.push('trust');
          if (p.isOkxWallet || p.isOKXWallet) detected.push('okx');
          if (p.isBitKeep) detected.push('bitkeep');
          if (p.isBinance) detected.push('binance');
          if (p.isPhantom) detected.push('phantom');
        });
      }
      
      if (eth.isRabby) detected.push('rabby');
      if (eth.isMetaMask && !eth.isRabby) detected.push('metamask');
      if (eth.isCoinbaseWallet || window.coinbaseWalletExtension) detected.push('coinbase');
      if (eth.isTrust || eth.isTrustWallet) detected.push('trust');
      if (eth.isOkxWallet || window.okxwallet) detected.push('okx');
      if (eth.isPhantom) detected.push('phantom');
    }

    if (window.keplr) detected.push('keplr');
    if (window.solana) detected.push('phantom');
    
    // TronLink එක detect කරන්න
    if (window.tronLink || window.tronWeb) detected.push('tronlink');

    setDetectedWallets(detected);
  }, [isOpen]);

  if (!isOpen) return null;

  const mainWallets = [
    { name: 'MetaMask', icon: '🦊', type: 'metamask' },
    { name: 'Rabby Wallet', icon: '🐰', type: 'rabby' },
    { name: 'Trust Wallet', icon: '🛡️', type: 'trust' },
    { name: 'TronLink', icon: '🔺', type: 'tronlink' },
  ];

  const otherWallets = [
    { name: 'Coinbase Wallet', icon: '🔵', type: 'coinbase' },
    { name: 'Binance Wallet', icon: '🟡', type: 'binance' },
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

  const displayedWallets = showAll ? otherWallets : mainWallets;

  const getSpecificProvider = (walletType) => {
    if (typeof window === 'undefined' || !window.ethereum) return null;
    const eth = window.ethereum;

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

    if (walletType === 'rabby' && eth.isRabby) return eth;
    if (walletType === 'metamask' && eth.isMetaMask && !eth.isRabby) return eth;
    if (walletType === 'coinbase' && (eth.isCoinbaseWallet || window.coinbaseWalletExtension)) return eth;
    if (walletType === 'trust' && (eth.isTrust || eth.isTrustWallet)) return eth;
    if (walletType === 'okx' && (eth.isOkxWallet || window.okxwallet)) return eth;
    if (walletType === 'phantom' && (window.phantom?.ethereum || eth.isPhantom)) return window.phantom?.ethereum || eth;

    if (walletType === 'keplr' && window.keplr) return window.keplr;
    if (walletType === 'phantom' && window.solana) return window.solana;

    return null;
  };

  const handleConnect = async (walletType) => {
    setIsConnecting(true);
    try {
      const selectedProvider = getSpecificProvider(walletType);
      if (selectedProvider) {
        await connectWallet(walletType, selectedProvider);
      } else {
        if (typeof openWalletApp === 'function') {
          openWalletApp(walletType);
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
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        <div className="p-5 border-b border-[#293249] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Connect a wallet</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-xl"
            disabled={isConnecting}
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-2">
          {!showAll && (
            <div className="space-y-2">
              {mainWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.type)}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-between p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                      {wallet.icon}
                    </div>
                    <span className="font-semibold text-white text-sm group-hover:text-brand-500 transition-colors">
                      {wallet.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {detectedWallets.includes(wallet.type) && (
                      <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        Detected
                      </span>
                    )}
                    <span className="text-gray-500">→</span>
                  </div>
                </button>
              ))}

              <button
                onClick={() => setShowAll(true)}
                className="w-full flex items-center justify-between p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                    🗂️
                  </div>
                  <span className="font-semibold text-white text-sm group-hover:text-brand-500 transition-colors">
                    Other wallets
                  </span>
                </div>
                <span className="text-gray-500">→</span>
              </button>
            </div>
          )}

          {showAll && (
            <div className="space-y-2">
              <button
                onClick={() => setShowAll(false)}
                className="text-sm text-brand-500 hover:text-brand-400 font-medium mb-2"
              >
                ← Back to main wallets
              </button>
              {otherWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.type)}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-between p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                      {wallet.icon}
                    </div>
                    <span className="font-semibold text-white text-sm group-hover:text-brand-500 transition-colors">
                      {wallet.name}
                    </span>
                  </div>
                  <span className="text-gray-500">→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#293249] text-center text-xs text-gray-500">
          By connecting a wallet, you agree to <span className="text-brand-500">NovaSwap Terms of Service</span>.
        </div>
      </div>
    </div>
  );
}