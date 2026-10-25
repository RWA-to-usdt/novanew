import SwapCard from '../components/SwapCard';
import MarketTicker from '../components/MarketTicker';
import { FaWallet, FaBolt, FaDroplet, FaGlobe, FaArrowRight } from 'react-icons/fa6';

export default function Swap({ walletAddress, provider }) {
  return (
    <div className="relative w-full overflow-hidden">
      
      {/* පසුබිමේ තියෙන ලස්සන පාට පාට ආලෝකය */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 flex flex-col items-center">
        
        {/* 1. HERO SECTION */}
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Trade Crypto. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
              Zero Limits.
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            The fastest, most secure way to swap tokens on Ethereum. Built for the future of DeFi.
          </p>
        </div>

        {/* 2. SWAP CARD */}
        <SwapCard walletAddress={walletAddress} provider={provider} />

        {/* 2.5 LIVE MARKET TICKER */}
        <MarketTicker />

        {/* 3. STATS SECTION (NovaSwap Stats) */}
        <div className="w-full max-w-5xl mt-32">
          <h2 className="text-3xl font-bold mb-8 text-center">NovaSwap Protocol Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#131A2A] p-6 rounded-3xl border border-white/5 text-center">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Volume</h3>
              <p className="text-4xl font-bold text-white">$850M+</p>
            </div>
            <div className="bg-[#131A2A] p-6 rounded-3xl border border-white/5 text-center">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Value Locked</h3>
              <p className="text-4xl font-bold text-white">$2.1B</p>
            </div>
            <div className="bg-[#131A2A] p-6 rounded-3xl border border-white/5 text-center">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Active Swappers</h3>
              <p className="text-4xl font-bold text-white">500K+</p>
            </div>
            <div className="bg-[#131A2A] p-6 rounded-3xl border border-white/5 border-green-500/30 text-center">
              <h3 className="text-green-400 text-sm font-medium mb-2">24H Volume</h3>
              <p className="text-4xl font-bold text-green-400">$12M</p>
            </div>
          </div>
        </div>

        {/* 4. LARGE FEATURE CARDS (NovaSwap Features) */}
        <div className="w-full max-w-5xl mt-32">
          <h2 className="text-3xl font-bold mb-8 text-center">Built for the future of DeFi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Web App */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#131A2A] to-[#0D111C] border border-blue-500/20 group cursor-pointer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-blue-400 text-sm font-semibold mb-4">
                  <FaGlobe /> <span>Web App</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Lightning Fast Swaps.</h3>
                <p className="text-gray-400 mb-6 max-w-sm">Execute trades instantly with our optimized routing engine across multiple DEXs.</p>
              </div>
            </div>

            {/* Card 2: Wallet */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#1C1325] to-[#0D111C] border border-purple-500/20 group cursor-pointer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-purple-400 text-sm font-semibold mb-4">
                  <FaWallet /> <span>Secure Wallet</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Your Keys. Your Crypto.</h3>
                <p className="text-gray-400 mb-6 max-w-sm">Non-custodial and secure. Trade with confidence knowing you control your assets.</p>
              </div>
            </div>

            {/* Card 3: Liquidity */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#0F1F1A] to-[#0D111C] border border-green-500/20 group cursor-pointer">
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-green-400 text-sm font-semibold mb-4">
                  <FaDroplet /> <span>Liquidity Provider</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Earn Passive Income.</h3>
                <p className="text-gray-400 mb-6">Provide liquidity to our pools and earn a share of the trading fees.</p>
              </div>
            </div>

            {/* Card 4: NovaX */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-[#131A2A] border border-white/5 group cursor-pointer">
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-purple-400 text-sm font-semibold mb-4">
                  <FaBolt /> <span>NovaX Router</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Smart Routing Protocol.</h3>
                <p className="text-gray-400 mb-6">Our custom router finds the best prices and minimizes slippage for you.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}