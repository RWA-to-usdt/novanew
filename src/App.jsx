import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';

import Swap from './pages/Swap';
import Explore from './pages/Explore';
import Pools from './pages/Pools';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Docs from './pages/Docs';
import Careers from './pages/Careers';
import Help from './pages/Help';
import API from './pages/API';
import About from './pages/About';
import Blog from './pages/Blog';
import Cookie from './pages/Cookie';

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // 1. Mobile App එකෙන් DApp In-App Browser එකට redirection එක ආ පසු auto-connect වීම
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autoconnect') === 'true') {
      const timer = setTimeout(() => {
        // Provider එක Load වී ඇත්දැයි ආරක්ෂිතව check කර Connect කිරීම
        const injectedProvider = typeof window !== 'undefined' ? window.ethereum : null;
        if (injectedProvider) {
          connectWallet('injected', injectedProvider);
        } else {
          console.warn('Injected provider not ready yet for autoconnect');
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // 2. Connect / Disconnect Main Handler
  const connectWallet = async (walletType, selectedProvider) => {
    // 🔴 2.1 දැනටමත් connect වී ඇත්නම් -> DISCONNECT LOGIC
    if (walletAddress) {
      try {
        if (provider && provider.provider && typeof provider.provider.disconnect === 'function') {
          await provider.provider.disconnect();
        }
        
        // Storage & Cache Purge
        localStorage.removeItem('walletconnect');
        localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
        localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
        
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('wc@2') || key.startsWith('walletconnect')) {
            localStorage.removeItem(key);
          }
        });
        
        sessionStorage.clear();
        setProvider(null);
        setWalletAddress(null);
        
        window.location.reload(); 
      } catch (error) {
        console.error('Error during disconnect:', error);
      }
      return;
    }

    // 🟢 2.2 අලුතින් CONNECT වන LOGIC
    try {
      let activeProvider = selectedProvider;

      // Modal එකෙන් provider එකක් යවා නොමැති නම් default window.ethereum එක ගන්න
      if (!activeProvider && typeof window !== 'undefined' && window.ethereum) {
        activeProvider = window.ethereum;
      }

      if (activeProvider) {
        const web3Provider = new ethers.providers.Web3Provider(activeProvider, 'any');
        
        await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        // Ethereum Mainnet (Chain ID 1) Switch Prompt
        if (network.chainId !== 1) {
          try {
            await activeProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1' }],
            });
          } catch (switchError) {
            console.warn('Network switch required:', switchError);
          }
        }

        setProvider(web3Provider);
        setWalletAddress(address);
        setIsWalletModalOpen(false);

      } else {
        // Fallback: Extension නොමැති විට WalletConnect Modal එක පෙන්වීම
        const walletConnectProvider = await EthereumProvider.init({
          projectId: '0204ba9ef8f8856cd275da139b717e8a',
          chains: [1],
          showQrModal: true,
        });

        await walletConnectProvider.connect();
        const web3Provider = new ethers.providers.Web3Provider(walletConnectProvider, 'any');
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();

        setProvider(web3Provider);
        setWalletAddress(address);
        setIsWalletModalOpen(false);
      }
    } catch (error) {
      console.error('Connection Failed:', error);
      if (error.code !== 4001) {
        alert('Connection failed: ' + (error.message || 'User cancelled'));
      }
    }
  };

  // 3. Mobile Wallet Deep Linking Function (25+ Wallets)
  const openWalletApp = (walletType) => {
    const currentUrl = window.location.href.split('?')[0];
    const targetUrl = `${currentUrl}?autoconnect=true`;
    const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    const encodedTarget = encodeURIComponent(targetUrl);

    let deepLink = '';

    switch (walletType) {
      case 'metamask':
        deepLink = `https://metamask.app.link/dapp/${cleanUrl}`;
        break;
      case 'trust':
        deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodedTarget}`;
        break;
      case 'coinbase':
        deepLink = `https://go.cb-w.com/dapp?url=${encodedTarget}`;
        break;
      case 'okx':
        deepLink = `https://www.okx.com/download?deeplink=${encodedTarget}`;
        break;
      case 'binance':
        deepLink = `https://app.binance.com/en/deeplink/cryptorouting/dapp?url=${encodedTarget}`;
        break;
      case 'phantom':
        deepLink = `https://phantom.app/ul/browse/${cleanUrl}?ref=${encodedTarget}`;
        break;
      case 'safepal':
        deepLink = `https://link.safepal.io/open_url?url=${encodedTarget}`;
        break;
      case 'tokenpocket':
        deepLink = `https://m.tokenpocket.pro/rest/dapp/open?url=${encodedTarget}`;
        break;
      case 'bitkeep':
        deepLink = `https://bkcode.vip?action=dapp&url=${encodedTarget}`;
        break;
      case 'coin98':
        deepLink = `https://coin98.com/dapp/${cleanUrl}`;
        break;
      case 'imtoken':
        deepLink = `https://token.im/dapp/${cleanUrl}`;
        break;
      case 'math':
        deepLink = `https://mathwallet.org/dapp/${cleanUrl}`;
        break;
      case 'zerion':
        deepLink = `https://zerion.io/dapp/${cleanUrl}`;
        break;
      case '1inch':
      case 'oneinch':
        deepLink = `https://1inch.io/dapp/${cleanUrl}`;
        break;
      case 'frontier':
        deepLink = `https://frontier.xyz/dapp/${cleanUrl}`;
        break;
      case 'dcent':
        deepLink = `https://dcentwallet.com/dapp/${cleanUrl}`;
        break;
      case 'xdefi':
        deepLink = `https://xdefi.io/dapp/${cleanUrl}`;
        break;
      case 'taho':
        deepLink = `https://taho.xyz/dapp/${cleanUrl}`;
        break;
      case 'blockwallet':
        deepLink = `https://blockwallet.io/dapp/${cleanUrl}`;
        break;
      case 'infinity':
        deepLink = `https://infinitywallet.io/dapp/${cleanUrl}`;
        break;
      default:
        deepLink = targetUrl;
    }

    window.location.href = deepLink;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar 
          walletAddress={walletAddress} 
          connectWallet={connectWallet} 
          openWalletModal={() => setIsWalletModalOpen(true)} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Swap walletAddress={walletAddress} provider={provider} />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/pools" element={<Pools walletAddress={walletAddress} openWalletModal={() => setIsWalletModalOpen(true)} />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/api" element={<API />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cookie" element={<Cookie />} />
          </Routes>
        </main>

        <Footer />

        <WalletModal 
          isOpen={isWalletModalOpen} 
          onClose={() => setIsWalletModalOpen(false)} 
          connectWallet={connectWallet} 
          openWalletApp={openWalletApp}
        />
      </div>
    </Router>
  );
}