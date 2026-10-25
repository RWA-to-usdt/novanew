import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import Swap from './pages/Swap';
import Explore from './pages/Explore';
import Pools from './pages/Pools';

// WalletConnect provider එක
let walletConnectProvider = null;

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // WalletConnect එකින් connect වෙන function එක
  const connectWallet = async () => {
    if (walletAddress) {
      setWalletAddress(null); 
      setProvider(null); 
      return;
    }
    
    try {
      // WalletConnect provider එක හදන්න
      const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
      
      walletConnectProvider = await EthereumProvider.init({
        projectId: "0204ba9ef8f8856cd275da139b717e8a", // ඔයාට WalletConnect Cloud එකෙන් ගන්න වෙනවා
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
      
    } catch (error) { 
      console.error(error); 
      alert("Connection failed: " + error.message);
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

        <WalletModal 
          isOpen={isWalletModalOpen} 
          onClose={() => setIsWalletModalOpen(false)} 
          connectWallet={connectWallet} 
        />
      </div>
    </Router>
  );
}