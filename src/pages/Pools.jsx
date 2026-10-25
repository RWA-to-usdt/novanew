import { FaTint, FaPlus, FaRocket } from 'react-icons/fa';
import PoolTable from '../components/PoolTable';

export default function Pools({ walletAddress, openWalletModal }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">Supply liquidity to collect fees</h1>
        <p className="text-gray-400 text-lg">Contribute to the largest protocol in DeFi</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button className="flex items-center space-x-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold transition">
          <FaTint />
          <span>Create position</span>
        </button>
        <button className="flex items-center space-x-2 bg-[#131A2A] border border-[#293249] hover:bg-[#1B2236] text-white px-6 py-3 rounded-xl font-semibold transition">
          <FaPlus />
          <span>Create Pool</span>
        </button>
        <button className="flex items-center space-x-2 bg-[#131A2A] border border-[#293249] hover:bg-[#1B2236] text-white px-6 py-3 rounded-xl font-semibold transition">
          <FaRocket />
          <span>Launch token</span>
        </button>
      </div>

      {!walletAddress && (
        <div className="w-full bg-gradient-to-r from-[#2D0F1E] to-[#1C0A14] border border-[#4A1A33] rounded-2xl p-8 mb-12 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-[50px]"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]"></div>
           <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Connect your wallet</h2>
           <p className="text-gray-400 mb-6 relative z-10">To view your positions and rewards you must connect your wallet.</p>
           <button onClick={openWalletModal} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-xl font-semibold transition relative z-10">
             Connect wallet
           </button>
        </div>
      )}

      <PoolTable />

    </div>
  );
}