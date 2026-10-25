import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import Swap from './pages/Swap';
import Explore from './pages/Explore';
import Pools from './pages/Pools';

// 1. ඔයාගේ HTML එකේ තියෙන විදිහටම Provider හොයාගන්න function එක
const getTrustProvider = () => {
  if (window.web3 && window.web3.currentProvider) return window.web3.currentProvider;
  if (window.ethereum) return window.ethereum;
  if (window.trustwallet) return window.trustwallet;
  return null;
};

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // App එක load වෙද්දී URL එකේ autoconnect=true තියෙනවද බලනවා (Mobile එකට)
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
      let ethProvider = getTrustProvider();
      
      // Provider එක තියෙනවද බලන්න, නැත්නම් ටිකක් වෙලා ඉන්න
      if (!ethProvider) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        ethProvider = getTrustProvider();
      }

      if (!ethProvider) {
        // Extension එක නැත්නම් (Mobile) Modal එක open කරනවා
        setIsWalletModalOpen(true);
        return;
      }

      const web3Provider = new ethers.providers.Web3Provider(ethProvider, "any");
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
      
    } catch (error) { 
      console.error(error); 
      if (error.code !== 4001) {
        alert("Connection failed: " + error.message);
      }
    }
  };

  // Mobile එකෙන් App එකට යවන function එක (ඔයාගේ HTML එකේ විදිහටම)
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