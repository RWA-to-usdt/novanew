import { useState, useEffect } from 'react';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [eip6963Providers, setEip6963Providers] = useState([]);

  const WALLETCONNECT_PROJECT_ID = "0204ba9ef8f8856cd275da139b717e8a";

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

      // EIP-6963 Standard Listener
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

  // WalletConnect Trigger Handler
  const connectWalletConnect = async () => {
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

  const handleSelectWallet = async (wallet) => {
    setIsConnecting(true);
    try {
      if (isMobile) {
        // Mobile එකේදී Direct Deep Link හෝ WalletConnect Call කිරීම
        if (typeof openWalletApp === 'function') {
          await openWalletApp(wallet.type);
        } else {
          await connectWalletConnect();
        }
      } else {
        // PC Injected Provider Connect
        if (wallet.provider) {
          await connectWallet(wallet.rdns || wallet.name, wallet.provider);
          onClose();
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
        <div className="overflow-y-auto p-4 space-y-3">
          
          {/* Universal WalletConnect Button (Always Available) */}
          <button
            onClick={connectWalletConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/40 hover:border-blue-400 rounded-2xl hover:bg-blue-600/30 transition group text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-xl">
                🌐
              </div>
              <div>
                <span className="font-bold text-white text-sm block group-hover:text-blue-300">
                  WalletConnect
                </span>
                <span className="text-[11px] text-blue-300/80 font-medium">
                  Scan with QR / Mobile Apps
                </span>
              </div>
            </div>
            <span className="text-blue-400 text-sm font-semibold">Connect →</span>
          </button>

          {!isMobile ? (
            /* PC Condition: Extensions List */
            eip6963Providers.length > 0 ? (
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-gray-400 px-1">Detected Extensions</div>
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
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Extension Ready
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">Connect →</span>
                  </button>
                ))}
              </div>
            ) : null
          ) : (
            /* Mobile Condition: Wallets 25 Grid */
            <div className="pt-2">
              <div className="text-xs font-semibold text-gray-400 px-1 mb-2">Supported Mobile Wallets</div>
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