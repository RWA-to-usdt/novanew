import { Link } from 'react-router-dom';
import { FaCode, FaBolt, FaShieldAlt } from 'react-icons/fa';

export default function API() {
  const endpoints = [
    { method: 'GET', path: '/api/v1/price', desc: 'Get live price for any token', example: '{ "token": "USDT", "price": 1.00 }' },
    { method: 'GET', path: '/api/v1/pools', desc: 'Get all available pools', example: '[{ "pair": "ETH/USDT", "tvl": "$120M" }]' },
    { method: 'POST', path: '/api/v1/swap', desc: 'Execute a swap', example: '{ "from": "USDT", "to": "ETH", "amount": 100 }' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">NovaSwap API</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Integrate our powerful swap engine into your applications. Fast, secure, and reliable.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <FaBolt className="text-3xl text-brand-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Lightning Fast</h2>
          <p className="text-gray-400 text-sm">Sub-second response times with 99.9% uptime.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <FaShieldAlt className="text-3xl text-green-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Secure</h2>
          <p className="text-gray-400 text-sm">Enterprise-grade security with API key authentication.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <FaCode className="text-3xl text-blue-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Easy Integration</h2>
          <p className="text-gray-400 text-sm">Simple REST API with SDKs for JavaScript and Python.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
      <div className="space-y-4 mb-12">
        {endpoints.map((ep, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold ${ep.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{ep.method}</span>
              <code className="text-white font-mono">{ep.path}</code>
            </div>
            <p className="text-gray-400 text-sm mb-3">{ep.desc}</p>
            <div className="bg-[#0D111C] p-3 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
              {ep.example}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-brand-500/10 to-purple-500/10 p-8 rounded-3xl border border-brand-500/20 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to build?</h2>
        <p className="text-gray-400 mb-4">Get your API key today and start integrating.</p>
        <button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold transition">Get API Key</button>
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}