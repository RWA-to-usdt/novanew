import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
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
  
  // EIP-6963 වලින් හම්බුනු wallets ලිස්ට් එක
  const [detectedWallets, setDetectedWallets] = useState([]);

  // Browser එකේ තියෙන wallets අහුලන්න
  useEffect(() => {
    const handleAnnounceProvider = (event) => {
      const { info, provider } = event.detail;
      setDetectedWallets((prev) => {
        // දැනටමත් ලිස්ට් එකේ තියෙනවා නම් ආයේ දාන්නේ නෑ
        if (prev.some((w) => w.info.uuid === info.uuid)) return prev;
        return [...prev, { info, provider }];
      });
    };

    window.addEventListener('eip6963:announceProvider', handleAnnounceProvider);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => window.removeEventListener('eip6963:announceProvider', handleAnnounceProvider);
  }, []);

  // Wallet එකක් තෝරද්දී ඒකට connect වෙන function එක
  const connectWallet = async (selectedProvider) => {
    if (walletAddress) {
      setWalletAddress(null); 
      setProvider(null); 
      return;
    }
    
    try {
      if (!selectedProvider) {
        alert("No wallet selected!");
        return;
      }

      const web3Provider = new ethers.providers.Web3Provider(selectedProvider, "any");
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

        {/* හම්බුනු wallets ලිස්ට් එක Modal එකට යවනවා */}
        <WalletModal 
          isOpen={isWalletModalOpen} 
          onClose={() => setIsWalletModalOpen(false)} 
          connectWallet={connectWallet} 
          detectedWallets={detectedWallets}
        />
      </div>
    </Router>
  );
}