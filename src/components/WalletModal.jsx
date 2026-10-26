import { useState, useEffect } from 'react';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [installedWallets, setInstalledWallets] = useState([]);

  // Mobile සඳහා වන Wallets List එක (25 Wallets)
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

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // Mobile Device Check
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileCheck = /android|ipad|iphone|ipod/i.test(userAgent);
    setIsMobile(mobileCheck);

    if (!mobileCheck) {
      const detected = [];
      const eth = window.ethereum;

      // 1. Injected EVM Extension Verification (Strict Checking)
      if (eth) {
        const providers = eth.providers || [eth];

        providers.forEach((p) => {
          if (p.isRabby && !detected.some(w => w.type === 'rabby')) {
            detected.push({ name: 'Rabby Wallet', icon: '🐰', type: 'rabby', provider: p });
          }
          if (p.isMetaMask && !p.isRabby && !detected.some(w => w.type === 'metamask')) {
            detected.push({ name: 'MetaMask', icon: '🦊', type: 'metamask', provider: p });
          }
          if (p.isCoinbaseWallet && !detected.some(w => w.type === 'coinbase')) {
            detected.push({ name: 'Coinbase Wallet', icon: '🔵', type: 'coinbase', provider: p });
          }
          if ((p.isTrust || p.isTrustWallet) && !detected.some(w => w.type === 'trust')) {
            detected.push({ name: 'Trust Wallet', icon: '🛡️', type: 'trust', provider: p });
          }
          if ((p.isOkxWallet || p.isOKXWallet) && !detected.some(w => w.type === 'okx')) {
            detected.push({ name: 'OKX Wallet', icon: '⭕', type: 'okx', provider: p });
          }
          if (p.isBitKeep && !detected.some(w => w.type === 'bitkeep')) {
            detected.push({ name: 'BitKeep', icon: '🔶', type: 'bitkeep', provider: p });
          }
        });
      }

      // Standalone Phantom Extension Check
      if (window.phantom?.ethereum?.isPhantom && !detected.some(w => w.type === 'phantom')) {
        detected.push({ name: 'Phantom', icon: '👻', type: 'phantom', provider: window.phantom.ethereum });
      }

      // Standalone TronLink Check
      if (window.tronLink && window.tronWeb && !detected.some(w => w.type === 'tronlink')) {
        detected.push({ name: 'TronLink', icon: '🔺', type: 'tronlink', provider: window.tronLink });
      }

      // Standalone Keplr Check
      if (window.keplr && !detected.some(w => w.type === 'keplr')) {
        detected.push({ name: 'Keplr', icon: '⚛️', type: 'keplr', provider: window.keplr });
      }

      setInstalledWallets(detected);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectWallet = async (wallet) => {
    setIsConnecting(true);
    try {
      if (isMobile) {
        // Mobile එකෙන් ආවොත් direct link එක open වීම
        if (typeof openWalletApp === 'function') {
          await openWalletApp(wallet.type);
        }
      } else {
        // PC එකෙන් ආවොත් target extension provider එකෙන් පමණක් connect වීම
        if (wallet.provider) {
          await connectWallet(wallet.type, wallet.provider);
        }
      }
    } catch (error) {
      console.error(`Error connecting ${wallet.name}:`, error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-[#111827] border border-[#1F293D] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1F293D] flex justify-between items-center bg-[#151D2F]">
          <div>
            <h3 className="text-lg font-bold text-white">Connect Wallet</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {isMobile ? 'Select a wallet to launch app' : 'Installed browser extensions'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-[#1F293D] text-gray-400 hover:text-white flex items-center justify-center text-lg"
            disabled={isConnecting}
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4">
          {!isMobile ? (
            /* PC Condition: Install කර ඇති Extensions පමණක් පෙන්වීම */
            installedWallets.length > 0 ? (
              <div className="space-y-2.5">
                {installedWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleSelectWallet(wallet)}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3.5 bg-[#172033] border border-[#232E45] hover:border-blue-500/50 rounded-2xl hover:bg-[#1E293E] transition group text-left"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0D1322] border border-[#232E45] flex items-center justify-center text-xl">
                        {wallet.icon}
                      </div>
                      <div>
                        <span className="font-semibold text-white text-sm block group-hover:text-blue-400">
                          {wallet.name}
                        </span>
                        <span className="text-[11px] text-green-400 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Ready to connect
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">Connect →</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4">
                <div className="text-4xl mb-3">🧩</div>
                <h4 className="text-white font-semibold text-base mb-1">No Wallet Extensions Found</h4>
                <p className="text-gray-400 text-xs max-w-xs mx-auto">
                  ඔබගේ Browser එකේ කිසිදු Wallet Extension එකක් Install කර නොමැත. කරුණාකර MetaMask හෝ Rabby Install කරගන්න.
                </p>
              </div>
            )
          ) : (
            /* Mobile Condition: Wallets 25 ලැයිස්තුව Grid ලෙස */
            <div className="grid grid-cols-2 gap-2.5">
              {allWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleSelectWallet(wallet)}
                  disabled={isConnecting}
                  className="flex items-center space-x-3 p-3 bg-[#172033] border border-[#232E45] hover:border-blue-500/40 rounded-2xl hover:bg-[#1E293E] transition text-left"
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
          By connecting a wallet, you agree to <span className="text-blue-400">NovaSwap Terms of Service</span>.
        </div>

      </div>
    </div>
  );
}