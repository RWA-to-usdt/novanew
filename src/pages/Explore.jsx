import TokenTable from '../components/TokenTable';

export default function Explore() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Tokens</h1>
          <p className="text-gray-400 text-sm">Discover top tokens on Ethereum.</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-[#131A2A] border border-[#293249] px-4 py-2 rounded-lg text-sm hover:bg-[#1B2236]">Top</button>
          <button className="bg-transparent text-gray-400 px-4 py-2 rounded-lg text-sm hover:text-white">Trending</button>
        </div>
      </div>
      <TokenTable />
    </div>
  );
}