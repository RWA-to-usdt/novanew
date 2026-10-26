import { useState, useEffect } from 'react';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [installedWallets, setInstalledWallets] = useState([]);

  // 1. All Supported Mobile Wallets (25 Wallets)
  const allWallets = [
    { name: 'MetaMask', icon: '🦊', type: 'metamask' },
    { name: 'Rabby Wallet', icon: '🐰', type: 'rabby' },
    { name: 'Trust Wallet', icon: '🛡️', type: 'trust' },
    { name: 'Coinbase Wallet', icon: '🔵', type: 'coinbase' },
    { name: 'OKX Wallet', icon: '⭕', type: 'okx' },
    { name: 'Binance Wallet', icon: '🟡', type: 'binance' },
    { name: 'Phantom', icon: '👻', type: 'phantom' },
    { name: 'TronLink', icon: '🔺', type: 'tronlink' },
    { name: 'SafePal', icon: '🛡️', type: 'safepal' },
    { name: 'TokenPocket', icon: '👛', type: 'tokenpocket' },
    { name: 'BitKeep / Bitget', icon: '🔶', type: 'bitkeep' },
    { name: 'Coin98', icon: '🟩', type: 'coin98' },
    { name: 'imToken', icon: '🔷', type: 'imtoken' },
    { name: 'Math Wallet', icon: '🧮', type: 'math' },
    { name: 'Keplr', icon: '⚛️', type: 'keplr' },
    { name: 'Zerion', icon: '🦄', type: 'zerion' },
    { name: 'Frontier', icon: '🚀', type: 'frontier' },
    { name: '1inch Wallet', icon: '🦄', type: 'oneinch' },
    { name: "D'CENT", icon: '💳', type: 'dcent' },
    { name: 'XDEFI', icon: '🛡️', type: 'xdefi' },
    { name: 'TON Wallet', icon: '💎', type: 'ton' },
    { name: 'Ledger Live', icon: '🔐', type: 'ledger' },
    { name: 'Taho', icon: '🦊', type: 'taho' },
    { name: 'BlockWallet', icon: '🧱', type: 'blockwallet' },
    { name: 'Infinity Wallet', icon: '♾️', type: 'infinity' },
  ];

  // 2. Mobile vs PC Device Detection & PC Extension Scanner
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // Device Detection Check
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileCheck = /android|ipad|iphone|ipod/i.test(userAgent);
    setIsMobile(mobileCheck);

    // PC User කෙනෙක් නම් පමණක් Extension Detection සිදු කිරීම
    if (!mobileCheck) {
      const detected = [];
      const eth = window.ethereum;
      const providers = eth?.providers || (eth ? [eth] : []);

      const checkInstalled = (type) => {
        if (type === 'metamask') return providers.some((p) => p.isMetaMask && !p.isRabby);
        if (type === 'rabby') return providers.some((p) => p.isRabby) || eth?.isRabby;
        if (type === 'coinbase') return providers.some((p) => p.isCoinbaseWallet) || window.coinbaseWalletExtension;
        if (type === 'trust') return providers.some((p) => p.isTrust || p.isTrustWallet) || eth?.isTrust;
        if (type === 'okx') return providers.some((p) => p.isOkxWallet || p.isOKXWallet) || window.okxwallet;
        if (type === 'bitkeep') return providers.some((p) => p.isBitKeep) || window.bitkeep;
        if (type === 'binance') return providers.some((p) => p.isBinance);
        if (type === 'phantom') return window.phantom?.ethereum || providers.some((p) => p.isPhantom) || window.solana;
        if (type === 'keplr') return !!window.keplr;
        if (type === 'tronlink') return !!(window.tronLink || window.tronWeb);
        return false;
      };

      allWallets.forEach((w) => {
        if (checkInstalled(w.type)) {
          detected.push(w);
        }
      });

      setInstalledWallets(detected);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Specific PC Provider Target logic
  const getPCProvider = (walletType) => {
    const eth = window.ethereum;
    if (!eth) return null;

    if (eth.providers && Array.isArray(eth.providers)) {
      if (walletType === 'metamask') return eth.providers.find((p) => p.isMetaMask && !p.isRabby);
      if (walletType === 'rabby') return eth.providers.find((p) => p.isRabby);
      if (walletType === 'coinbase') return eth.providers.find((p) => p.isCoinbaseWallet);
      if (walletType === 'trust') return eth.providers.find((p) => p.isTrust || p.isTrustWallet);
      if (walletType === 'okx') return eth.providers.find((p) => p.isOkxWallet);
      if (walletType === 'bitkeep') return eth.providers.find((p) => p.isBitKeep);
      if (walletType === 'phantom') return window.phantom?.ethereum || eth.providers.find((p) => p.isPhantom);
    }

    if (walletType === 'keplr') return window.keplr;
    if (walletType === 'phantom') return window.phantom?.ethereum || window.solana;
    if (walletType === 'tronlink') return window.tronLink;

    return eth;
  };

  const handleSelectWallet = async (walletType) => {
    setIsConnecting(true);
    try {
      if (isMobile) {
        // 02. Mobile Condition: Deep link එක හරහා DApp එක open කිරීම
        if (typeof openWalletApp === 'function') {
          await openWalletApp(walletType);
        } else {
          console.warn(`openWalletApp function is not defined for ${walletType}`);
        }
      } else {
        // 01. PC Condition: Selected Extension Provider එක හරහා Connect කිරීම
        const targetProvider = getPCProvider(walletType);
        if (targetProvider) {
          await connectWallet(walletType, targetProvider);
        } else {
          console.error(`Provider for ${walletType} not found.`);
        }
      }
    } catch (error) {
      console.error(`Error connecting ${walletType}:`, error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all">
      <div className="bg-[#111827] border border-[#1F293D] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1F293D] flex justify-between items-center bg-[#151D2F]">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">Connect Wallet</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {isMobile ? 'Select a wallet to launch app' : 'Installed browser extensions detected'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-[#1F293D] text-gray-400 hover:text-white hover:bg-[#2B384E] flex items-center justify-center transition text-lg"
            disabled={isConnecting}
          >
            &times;
          </button>
        </div>

        {/* Wallet List Body */}
        <div className="overflow-y-auto p-4 custom-scrollbar">
          {!isMobile ? (
            /* Condition 01: PC Layout (Installed Extensions Only) */
            installedWallets.length > 0 ? (
              <div className="space-y-2.5">
                {installedWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleSelectWallet(wallet.type)}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3.5 bg-[#172033] border border-[#232E45] hover:border-blue-500/50 rounded-2xl hover:bg-[#1E293E] transition-all duration-200 group text-left disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0D1322] border border-[#232E45] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                        {wallet.icon}
                      </div>
                      <div>
                        <span className="font-semibold text-white text-sm block group-hover:text-blue-400 transition-colors">
                          {wallet.name}
                        </span>
                        <span className="text-[11px] text-green-400 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Ready to connect
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 group-hover:text-white transition-colors text-sm font-medium">Connect →</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4">
                <div className="text-4xl mb-3">🧩</div>
                <h4 className="text-white font-semibold text-base mb-1">No Wallet Extensions Found</h4>
                <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                  Please install MetaMask, Rabby, Trust Wallet or another Web3 extension in your browser to proceed.
                </p>
              </div>
            )
          ) : (
            /* Condition 02: Mobile Layout (Grid of 25 Wallets) */
            <div className="grid grid-cols-2 gap-2.5">
              {allWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleSelectWallet(wallet.type)}
                  disabled={isConnecting}
                  className="flex items-center space-x-3 p-3 bg-[#172033] border border-[#232E45] hover:border-blue-500/40 rounded-2xl hover:bg-[#1E293E] transition duration-200 disabled:opacity-50 text-left active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0D1322] border border-[#232E45] flex items-center justify-center text-lg shrink-0">
                    {wallet.icon}
                  </div>
                  <span className="font-medium text-white text-xs truncate">{wallet.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F293D] bg-[#151D2F] text-center text-[11px] text-gray-400">
          By connecting a wallet, you agree to <span className="text-blue-400 font-medium hover:underline cursor-pointer">NovaSwap Terms of Service</span>.
        </div>

      </div>
    </div>
  );
}