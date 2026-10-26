import { useState, useEffect } from 'react';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [detectedWallets, setDetectedWallets] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Device Type Check (Mobile / PC)
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|ipad|iphone|ipod/i.test(userAgent);
    };
    setIsMobile(checkMobile());
  }, []);

  // 2. Desktop වල Install කරලා තියෙන Extensions විතරක් Auto-Detect කිරීම
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const installed = [];
    const eth = window.ethereum;

    // Standard Multi-Provider Array (EIP-6963 / Provider list)
    const providers = eth?.providers || (eth ? [eth] : []);

    // Provider Validation Checks
    const hasMetaMask = providers.some((p) => p.isMetaMask && !p.isRabby);
    const hasRabby = providers.some((p) => p.isRabby) || eth?.isRabby;
    const hasCoinbase = providers.some((p) => p.isCoinbaseWallet) || window.coinbaseWalletExtension;
    const hasTrust = providers.some((p) => p.isTrust || p.isTrustWallet) || eth?.isTrust;
    const hasOKX = providers.some((p) => p.isOkxWallet || p.isOKXWallet) || window.okxwallet;
    const hasBitKeep = providers.some((p) => p.isBitKeep) || window.bitkeep;
    const hasPhantom = window.phantom?.ethereum || providers.some((p) => p.isPhantom);

    if (hasMetaMask) installed.push({ name: 'MetaMask', icon: '🦊', type: 'metamask', provider: eth });
    if (hasRabby) installed.push({ name: 'Rabby Wallet', icon: '🐰', type: 'rabby', provider: eth });
    if (hasCoinbase) installed.push({ name: 'Coinbase Wallet', icon: '🔵', type: 'coinbase', provider: eth });
    if (hasTrust) installed.push({ name: 'Trust Wallet', icon: '🛡️', type: 'trust', provider: eth });
    if (hasOKX) installed.push({ name: 'OKX Wallet', icon: '⭕', type: 'okx', provider: eth });
    if (hasBitKeep) installed.push({ name: 'BitKeep', icon: '🔶', type: 'bitkeep', provider: eth });
    if (hasPhantom) installed.push({ name: 'Phantom', icon: '👻', type: 'phantom', provider: window.phantom?.ethereum || eth });

    // කිසිම Extension එකක් Detect වුණේ නැත්නම් Default Injected Provider එක පෙන්වීම
    if (installed.length === 0 && eth) {
      installed.push({ name: 'Browser Wallet', icon: '🌐', type: 'injected', provider: eth });
    }

    setDetectedWallets(installed);
  }, [isOpen]);

  if (!isOpen) return null;

  // Mobile සඳහා වන All Wallets List එක (Deep Links සඳහා)
  const mobileWallets = [
    { name: 'MetaMask', icon: '🦊', type: 'metamask' },
    { name: 'Trust Wallet', icon: '🛡️', type: 'trust' },
    { name: 'Coinbase Wallet', icon: '🔵', type: 'coinbase' },
    { name: 'Binance Wallet', icon: '🟡', type: 'binance' },
    { name: 'Rabby Wallet', icon: '🐰', type: 'rabby' },
    { name: 'OKX Wallet', icon: '⭕', type: 'okx' },
    { name: 'Phantom', icon: '👻', type: 'phantom' },
    { name: 'SafePal', icon: '🛡️', type: 'safepal' },
    { name: 'TokenPocket', icon: '👛', type: 'tokenpocket' },
    { name: 'Coin98', icon: '🟩', type: 'coin98' },
    { name: 'BitKeep', icon: '🔶', type: 'bitkeep' },
  ];

  // Specific Provider Selector logic
  const getSelectedProvider = (walletType) => {
    const eth = window.ethereum;
    if (!eth) return null;

    if (eth.providers && Array.isArray(eth.providers)) {
      if (walletType === 'metamask') return eth.providers.find((p) => p.isMetaMask && !p.isRabby);
      if (walletType === 'rabby') return eth.providers.find((p) => p.isRabby);
      if (walletType === 'coinbase') return eth.providers.find((p) => p.isCoinbaseWallet);
      if (walletType === 'trust') return eth.providers.find((p) => p.isTrust || p.isTrustWallet);
      if (walletType === 'okx') return eth.providers.find((p) => p.isOkxWallet);
      if (walletType === 'bitkeep') return eth.providers.find((p) => p.isBitKeep);
    }
    return eth;
  };

  const handleConnect = async (wallet) => {
    setIsConnecting(true);
    try {
      if (isMobile) {
        // Mobile device එකක් නම් direct app deep link එක open කිරීම
        await openWalletApp(wallet.type);
      } else {
        // PC එකක් නම් specific extension provider එකෙන්ම connect කිරීම
        const provider = getSelectedProvider(wallet.type) || wallet.provider;
        await connectWallet(wallet.type, provider);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const displayWallets = isMobile ? mobileWallets : detectedWallets;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        <div className="p-4 border-b border-[#293249] flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Connect a Wallet</h3>
            <p className="text-xs text-gray-400">
              {isMobile ? 'Select a wallet to open app' : 'Detected browser extensions'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-xl"
            disabled={isConnecting}
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {displayWallets.length > 0 ? (
            displayWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnect(wallet)}
                disabled={isConnecting}
                className="flex items-center space-x-3 p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white text-lg">
                  {wallet.icon}
                </div>
                <span className="font-semibold text-white text-sm">{wallet.name}</span>
              </button>
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-gray-400 text-sm">
              No wallet extensions detected in your browser. Please install MetaMask, Rabby, or another Web3 extension.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#293249] text-center text-xs text-gray-500">
          By connecting a wallet, you agree to NovaSwap Terms of Service.
        </div>
      </div>
    </div>
  );
}