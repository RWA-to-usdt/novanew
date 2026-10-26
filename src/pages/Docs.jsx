export default function Docs() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      <p className="text-gray-400 mb-8">Learn how to use NovaSwap and integrate our API.</p>
      <div className="space-y-6">
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <h2 className="text-xl font-bold text-white mb-2">Getting Started</h2>
          <p className="text-gray-400">Connect your wallet to start swapping tokens instantly.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <h2 className="text-xl font-bold text-white mb-2">API Reference</h2>
          <p className="text-gray-400">Use our REST API to integrate NovaSwap into your own applications.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <h2 className="text-xl font-bold text-white mb-2">Smart Contracts</h2>
          <p className="text-gray-400">View our verified smart contracts on Etherscan.</p>
        </div>
      </div>
    </div>
  );
}