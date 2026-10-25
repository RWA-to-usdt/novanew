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
    if (walletAddress) {
      setWalletAddress(null); 
      setProvider(null); 
      return;
    }
    
    try {
      // 1. PC එකේ extension එක තියෙනවද බලනවා
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await web3Provider.send('eth_requestAccounts', []);
        
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
      } 
      // 2. Extension එක නැත්නම් (Mobile) WalletConnect පාවිච්චි කරනවා
      else {
        const walletConnectProvider = await EthereumProvider.init({
          projectId: "0204ba9ef8f8856cd275da139b717e8a",
          chains: [1],
          showQrModal: true,
        });

        await walletConnectProvider.connect();

        const web3Provider = new ethers.providers.Web3Provider(walletConnectProvider, "any");
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();

        setProvider(web3Provider);
        setWalletAddress(address);
        setIsWalletModalOpen(false); 
      }
      
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