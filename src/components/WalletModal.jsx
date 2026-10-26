import { useState, useEffect } from 'react';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [eip6963Providers, setEip6963Providers] = useState([]);

  // Mobile සඳහා වන Wallets 25 List එක
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
      const providersMap = new Map();

      // 🌟 EIP-6963 Standard Event Listener (Browser එකේ තියෙන සියලුම Extension Auto-Detect කරයි)
      const onAnnounceProvider = (event) => {
        const { info, provider } = event.detail;
        if (info && info.rdns) {
          providersMap.set(info.rdns, {
            name: info.name,
            icon: info.icon,
            rdns: info.rdns,
            provider: provider,
          });
          setEip6963Providers(Array.from(providersMap.values()));
        }
      };

      window.addEventListener('eip6963:announceProvider', onAnnounceProvider);
      window.dispatchEvent(new Event('eip6963:requestProvider'));

      // Legacy Injected Providers Fallback Check
      setTimeout(() => {
        const eth = window.ethereum;
        if (eth) {
          const providers = eth.providers || [eth];
          providers.forEach((p) => {
            if (p.isMetaMask && !p.isRabby && !providersMap.has('io.metamask')) {
              providersMap.set('io.metamask', { name: 'MetaMask', icon: '🦊', provider: p });
            }
            if (p.isRabby && !providersMap.has('io.rabby')) {
              providersMap.set('io.rabby', { name: 'Rabby Wallet', icon: '🐰', provider: p });
            }
            if ((p.isTrust || p.isTrustWallet) && !providersMap.has('com.trustwallet')) {
              providersMap.set('com.trustwallet', { name: 'Trust Wallet', icon: '🛡️', provider: p });
            }
            if (p.isCoinbaseWallet && !providersMap.has('com.coinbase.wallet')) {
              providersMap.set('com.coinbase.wallet', { name: 'Coinbase Wallet', icon: '🔵', provider: p });
            }
          });
        }

        if (window.phantom?.ethereum && !providersMap.has('app.phantom')) {
          providersMap.set('app.phantom', { name: 'Phantom', icon: '👻', provider: window.phantom.ethereum });
        }
        if (window.tronLink && window.tronWeb && !providersMap.has('org.tronlink')) {
          providersMap.set('org.tronlink', { name: 'TronLink', icon: '🔺', provider: window.tronLink });
        }

        setEip6963Providers(Array.from(providersMap.values()));
      }, 300);

      return () => {
        window.removeEventListener('eip6963:announceProvider', onAnnounceProvider);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectWallet = async (wallet) => {
    setIsConnecting(true);
    try {
      if (isMobile) {
        if (typeof openWalletApp === 'function') {
          await openWalletApp(wallet.type);
        }
      } else {
        if (wallet.provider) {
          await connectWallet(wallet.rdns || wallet.name, wallet.provider);
        }
      }
    } catch (error) {
      console.error(`Error connecting:`, error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-[#111827] border border-[#1F293D] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1F293D] flex justify-between items-center bg-[#151D2F]">
          <div>
            <h3 className="text-lg font-bold text-white">Connect Wallet</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {isMobile ? 'Select a wallet to launch app' : 'Installed browser extensions detected'}
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

        {/* Wallet List Body */}
        <div className="overflow-y-auto p-4">
          {!isMobile ? (
            /* PC Condition: Install වී ඇති සියලුම Extension පෙන්වීම */
            eip6963Providers.length > 0 ? (
              <div className="space-y-2.5">
                {eip6963Providers.map((item, idx) => (
                  <button
                    key={item.rdns || idx}
                    onClick={() => handleSelectWallet(item)}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3.5 bg-[#172033] border border-[#232E45] hover:border-blue-500/50 rounded-2xl hover:bg-[#1E293E] transition group text-left"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0D1322] border border-[#232E45] flex items-center justify-center text-xl">
                        {typeof item.icon === 'string' && item.icon.startsWith('data:') ? (
                          <img src={item.icon} alt={item.name} className="w-6 h-6 rounded" />
                        ) : (
                          item.icon || '👛'
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-white text-sm block group-hover:text-blue-400">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-green-400 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Ready
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
                <h4 className="text-white font-semibold text-base mb-1">No Extensions Detected</h4>
                <p className="text-gray-400 text-xs max-w-xs mx-auto">
                  ඔබගේ Browser එකේ Active Web3 Extension එකක් හමු නොවුණි.
                </p>
              </div>
            )
          ) : (
            /* Mobile Condition: Wallets 25 Grid */
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