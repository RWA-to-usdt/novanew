import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0D111C] border-t border-[#293249] mt-20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-brand-500 transition">Swap</Link></li>
              <li><Link to="/explore" className="hover:text-brand-500 transition">Explore</Link></li>
              <li><Link to="/pools" className="hover:text-brand-500 transition">Pools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/docs" className="hover:text-brand-500 transition">Documentation</Link></li>
              <li><Link to="/help" className="hover:text-brand-500 transition">Help Center</Link></li>
              <li><Link to="/api" className="hover:text-brand-500 transition">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-brand-500 transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-brand-500 transition">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-brand-500 transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-brand-500 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-500 transition">Terms of Service</Link></li>
              <li><Link to="/cookie" className="hover:text-brand-500 transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Security Audit Section */}
        <div className="bg-[#131A2A] border border-[#293249] rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-3 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="text-white font-semibold text-sm">Security First</p>
              <p className="text-xs text-gray-400">Powered by Uniswap's Universal Router, audited by OpenZeppelin.</p>
            </div>
          </div>
          <a 
            href="https://www.openzeppelin.com/news/uniswap-universal-router-2-1-and-v4-periphery-audit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-500 hover:text-brand-400 bg-brand-500/10 px-4 py-2 rounded-lg border border-brand-500/20 transition"
          >
            View Audit Report →
          </a>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="border-t border-[#293249] pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold tracking-tight text-white">NovaSwap</span>
            <span className="text-sm text-gray-500">© 2026 NovaSwap Labs</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4 text-gray-400">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaTwitter size={18} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaGithub size={18} /></a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaDiscord size={18} /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}