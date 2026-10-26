import { useState } from 'react';
import { FaWallet, FaEthereum, FaBitcoin, FaTelegram, FaShieldAlt, FaAtom, FaCalculator, FaRocket, FaCreditCard, FaInfinity, FaImage, FaBrick, FaUnicorn } from 'react-icons/fa';
import { SiTrustwallet, SiCoinbase, SiBinance, SiOkx } from 'react-icons/si';

export default function WalletModal({ isOpen, onClose, connectWallet, openWalletApp }) {
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const wallets = [
    { name: 'MetaMask', icon: '🦊', type: 'metamask' },
    { name: 'Trust Wallet', icon: <SiTrustwallet />, type: 'trust' },
    { name: 'Coinbase Wallet', icon: <SiCoinbase />, type: 'coinbase' },
    { name: 'Binance Wallet', icon: <SiBinance />, type: 'binance' },
    { name: 'Rabby Wallet', icon: '🐰', type: 'rabby' },
    { name: 'OKX Wallet', icon: <SiOkx />, type: 'okx' },
    { name: 'Ledger', icon: '🔐', type: 'ledger' },
    { name: 'Trezor', icon: '🔑', type: 'trezor' },
    { name: 'TON Wallet', icon: <FaTelegram />, type: 'ton' },
    { name: 'Phantom', icon: '👻', type: 'phantom' },
    { name: 'Keplr', icon: <FaAtom />, type: 'keplr' },
    { name: 'Math Wallet', icon: <FaCalculator />, type: 'math' },
    { name: 'SafePal', icon: <FaShieldAlt />, type: 'safepal' },
    { name: 'TokenPocket', icon: <FaWallet />, type: 'tokenpocket' },
    { name: 'imToken', icon: <FaEthereum />, type: 'imtoken' },
    { name: 'BitKeep', icon: <FaBitcoin />, type: 'bitkeep' },
    { name: 'Coin98', icon: '🟩', type: 'coin98' },
    { name: 'Zerion', icon: <FaUnicorn />, type: 'zerion' },
    { name: 'Frontier', icon: <FaRocket />, type: 'frontier' },
    { name: 'D\'CENT', icon: <FaCreditCard />, type: 'dcent' },
    { name: 'XDEFI', icon: <FaShieldAlt />, type: 'xdefi' },
    { name: 'Taho', icon: '🦊', type: 'taho' },
    { name: 'Frame', icon: <FaImage />, type: 'frame' },
    { name: 'BlockWallet', icon: <FaBrick />, type: 'blockwallet' },
    { name: 'Infinity Wallet', icon: <FaInfinity />, type: 'infinity' },
  ];

  const handleConnect = async (walletType) => {
    setIsConnecting(true);
    if (window.ethereum) {
      await connectWallet();
    } else {
      openWalletApp(walletType);
    }
    setIsConnecting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        <div className="p-4 border-b border-[#293249] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Connect a Wallet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.type)}
              disabled={isConnecting}
              className="flex items-center space-x-3 p-3 bg-[#0D111C] border border-[#293249] rounded-xl hover:bg-[#1B2236] transition disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white text-lg">
                {wallet.icon}
              </div>
              <span className="font-semibold text-white text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-[#293249] text-center text-xs text-gray-500">
          By connecting a wallet, you agree to NovaSwap Terms of Service.
        </div>
      </div>
    </div>
  );
}