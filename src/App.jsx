import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';

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

  // 1. Connect / Disconnect Handler (WalletConnect Only)
  const connectWallet = async (walletType, wcProvider) => {
    // 🔴 1.1 Disconnect Logic
    if (walletAddress) {
      try {
        if (provider && provider.provider && typeof provider.provider.disconnect === 'function') {
          await provider.provider.disconnect();
        }
        
        // Storage & Cache Clear
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

    // 🟢 1.2 Connect Logic
    try {
      if (wcProvider) {
        const web3Provider = new ethers.providers.Web3Provider(wcProvider, 'any');
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();

        setProvider(web3Provider);
        setWalletAddress(address);
        setIsWalletModalOpen(false);
      }
    } catch (error) {
      console.error('WalletConnect Connection Failed:', error);
      
      const errorMessage = error?.message || '';
      const isUserCancelled = 
        error?.code === 4001 || 
        errorMessage.toLowerCase().includes('user cancelled') || 
        errorMessage.toLowerCase().includes('rejected');

      if (!isUserCancelled) {
        alert('Connection failed: ' + errorMessage);
      }
    }
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
        />
      </div>
    </Router>
  );
}