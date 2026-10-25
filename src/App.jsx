import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import Swap from './pages/Swap';
import Explore from './pages/Explore';
import Pools from './pages/Pools';

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Mobile එකෙන් ආවොත් autoconnect කරන්න
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autoconnect') === 'true') {
      setTimeout(() => connectWallet(), 1500);
    }
  }, []);

  const connectWallet = async () => {
    // 1. දැනටමත් connect වෙලා නම් -> DISCONNECT
    if (walletAddress) {
      try {
        // WalletConnect Session එක Disconnect කිරීම
        if (provider && provider.provider && typeof provider.provider.disconnect === "function") {
          await provider.provider.disconnect();
        }

        // Web3Modal cache එක clear කිරීම
        const web3Modal = new Web3Modal({
          cacheProvider: false,
          providerOptions: {},
        });
        web3Modal.clearCachedProvider();

        // LocalStorage හි ඇති WalletConnect Keys ඉවත් කිරීම
        localStorage.removeItem("walletconnect");
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
        localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('wc@2')) {
            localStorage.removeItem(key);
          }
        });
        sessionStorage.clear();

        setProvider(null);
        setWalletAddress(null);

        alert("Wallet Disconnected Successfully! Refresh the page to reconnect.");
        window.location.reload(); 
        
      } catch (error) {
        console.error("Error during disconnect:", error);
      }
      return;
    }
    
    // 2. අලුතින් connect වෙන්න (Web3Modal හරහා)
    try {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY", // ඔයාගේ Alchemy API Key එක දාන්න
            },
          },
        },
      };

      const web3Modal = new Web3Modal({
        cacheProvider: false, // Auto-connect වැළැක්වීමට false කරන්න
        providerOptions,
        disableInjectedProvider: false
      });

      // modal.clearCachedProvider() එක connection එකට පෙරත් කැඳවන්න
      web3Modal.clearCachedProvider();  

      const instance = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(instance, "any");
      
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();
      if (network.chainId !== 1) {
        alert('Please switch your wallet network to Ethereum Mainnet!');
        return;
      }

      setProvider(web3Provider);
      setWalletAddress(address);
      setIsWalletModalOpen(false); 
      
    } catch (error) { 
      console.error(error); 
      if (error.code !== 4001) {
        alert("Connection failed: " + error.message);
      }
    }
  };

  // Mobile එකෙන් App එකට යවන function එක
  const openWalletApp = (walletType) => {
    let currentUrl = window.location.href.split('?')[0];
    let targetUrl = `${currentUrl}?autoconnect=true`;
    let cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    let deepLink = '';

    switch (walletType) {
      case 'metamask': deepLink = `https://metamask.app.link/dapp/${cleanUrl}`; break;
      case 'trust': deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(targetUrl)}`; break;
      case 'coinbase': deepLink = `https://go.cb-w.com/dapp?url=${encodeURIComponent(targetUrl)}`; break;
      default: deepLink = targetUrl;
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