import { Link } from 'react-router-dom';
import { FaBook, FaCode, FaShieldAlt, FaRocket } from 'react-icons/fa';

export default function Docs() {
  const docs = [
    {
      icon: <FaRocket className="text-3xl text-brand-500" />,
      title: 'Getting Started',
      desc: 'Learn how to connect your wallet, swap tokens, and provide liquidity on NovaSwap.',
      link: '#',
    },
    {
      icon: <FaBook className="text-3xl text-blue-400" />,
      title: 'User Guide',
      desc: 'Detailed instructions on using our platform, including wallet setup and transaction management.',
      link: '#',
    },
    {
      icon: <FaCode className="text-3xl text-green-400" />,
      title: 'API Reference',
      desc: 'Integrate NovaSwap into your own applications with our REST API and Web3 SDK.',
      link: '#',
    },
    {
      icon: <FaShieldAlt className="text-3xl text-purple-400" />,
      title: 'Smart Contracts',
      desc: 'View our verified smart contracts, audit reports, and security best practices.',
      link: '#',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Documentation</h1>
      <p className="text-gray-400 mb-12">Everything you need to know about using and building on NovaSwap.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] hover:border-brand-500/50 transition">
            <div className="mb-4">{doc.icon}</div>
            <h2 className="text-xl font-bold text-white mb-2">{doc.title}</h2>
            <p className="text-gray-400 text-sm">{doc.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}