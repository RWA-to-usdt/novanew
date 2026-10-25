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
              <li><Link to="#" className="hover:text-brand-500 transition">Documentation</Link></li>
              <li><Link to="#" className="hover:text-brand-500 transition">Help Center</Link></li>
              <li><Link to="#" className="hover:text-brand-500 transition">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="#" className="hover:text-brand-500 transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-brand-500 transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-brand-500 transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="#" className="hover:text-brand-500 transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-brand-500 transition">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-brand-500 transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="border-t border-[#293249] pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold tracking-tight text-white">NovaSwap</span>
            <span className="text-sm text-gray-500">© 2024 NovaSwap Labs</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-white transition"><FaTwitter size={18} /></a>
              <a href="#" className="hover:text-white transition"><FaGithub size={18} /></a>
              <a href="#" className="hover:text-white transition"><FaDiscord size={18} /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}