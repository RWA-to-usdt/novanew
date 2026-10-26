import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaQuestionCircle, FaEnvelope, FaBook, FaTelegram, FaDiscord } from 'react-icons/fa';

export default function Help() {
  const [search, setSearch] = useState('');

  const faqs = [
    { q: 'How do I connect my wallet?', a: 'Click the "Connect" button in the top right corner and select your preferred wallet (MetaMask, Trust Wallet, etc.).' },
    { q: 'What are the fees?', a: 'NovaSwap charges a 0.05% fee on all swaps. This is one of the lowest fees in the industry.' },
    { q: 'Is NovaSwap safe?', a: 'Yes, our smart contracts are audited and non-custodial. You always control your funds.' },
    { q: 'How do I provide liquidity?', a: 'Go to the Pools page and click "Create Position" to add liquidity to any pool.' },
    { q: 'Which wallets are supported?', a: 'We support MetaMask, Trust Wallet, Coinbase Wallet, WalletConnect, and any injected Web3 wallet.' },
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-gray-400 mb-8">Find answers to your questions about NovaSwap.</p>
        <div className="relative max-w-xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131A2A] border border-[#293249] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] text-center">
          <FaQuestionCircle className="text-3xl text-brand-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">FAQ</h2>
          <p className="text-gray-400 text-sm">Browse our most frequently asked questions.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] text-center">
          <FaBook className="text-3xl text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Documentation</h2>
          <p className="text-gray-400 text-sm">Read our detailed guides and tutorials.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] text-center">
          <FaEnvelope className="text-3xl text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-400 text-sm">Get in touch with our support team.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-12">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
            <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
            <p className="text-gray-400">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="text-center bg-gradient-to-r from-[#1C1325] to-[#0D111C] p-8 rounded-3xl border border-purple-500/20">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-gray-400 mb-6">Join our community channels for live support.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="bg-[#131A2A] p-4 rounded-xl border border-[#293249] hover:border-brand-500 transition flex items-center space-x-2 text-white">
            <FaTelegram /> <span>Telegram</span>
          </a>
          <a href="#" className="bg-[#131A2A] p-4 rounded-xl border border-[#293249] hover:border-brand-500 transition flex items-center space-x-2 text-white">
            <FaDiscord /> <span>Discord</span>
          </a>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}