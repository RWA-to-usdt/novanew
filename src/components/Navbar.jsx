import { Link, useLocation } from 'react-router-dom';
import { FaWallet, FaBolt } from 'react-icons/fa';

export default function Navbar({ walletAddress, connectWallet, openWalletModal }) {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Swap' },
    { path: '/explore', label: 'Explore' },
    { path: '/pools', label: 'Pools' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0D111C]/90 backdrop-blur-md border-b border-[#293249] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-500/30">
              <FaBolt />
            </div>
            <span className="text-xl font-bold tracking-tight hidden md:block">NovaSwap</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`transition-colors ${location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {walletAddress ? (
            // Connect වෙලා නම් Disconnect button එක පෙන්නන්න
            <>
              <span className="text-sm font-semibold text-white bg-[#131A2A] px-3 py-2 rounded-xl border border-[#293249]">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <button
                onClick={connectWallet} 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-xl text-sm transition"
              >
                Disconnect
              </button>
            </>
          ) : (
            // Connect වෙලා නැත්නම් Connect button එක පෙන්නන්න
            <button
              onClick={openWalletModal} 
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-brand-500/20 flex items-center space-x-2"
            >
              <FaWallet />
              <span>Connect</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}