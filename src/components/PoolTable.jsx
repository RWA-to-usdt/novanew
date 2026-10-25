import { MOCK_POOLS } from '../config';

export default function PoolTable() {
  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-bold mb-4">Top pools</h3>
      <div className="bg-[#131A2A] border border-[#293249] rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 border-b border-[#293249] bg-[#0D111C]">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Pool</th>
              <th className="px-4 py-3 font-medium">TVL</th>
              <th className="px-4 py-3 font-medium text-right">↓ 1D vol</th>
              <th className="px-4 py-3 font-medium text-right">30D vol</th>
              <th className="px-4 py-3 font-medium text-right">1D vol/TVL</th>
              <th className="px-4 py-3 font-medium text-right">Pool APR</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_POOLS.map((pool) => (
              <tr key={pool.rank} className="border-b border-[#293249] hover:bg-[#1B2236] transition-colors cursor-pointer">
                <td className="px-4 py-4 text-gray-500">{pool.rank}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <img src={pool.icons[0]} className="w-6 h-6 rounded-full border-2 border-[#131A2A]" alt="Token1" />
                      <img src={pool.icons[1]} className="w-6 h-6 rounded-full border-2 border-[#131A2A]" alt="Token2" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{pool.pair}</div>
                      <div className="text-xs text-gray-500">{pool.version}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-mono">{pool.tvl}</td>
                <td className="px-4 py-4 font-mono text-right">{pool.vol1d}</td>
                <td className="px-4 py-4 font-mono text-right">{pool.vol30d}</td>
                <td className="px-4 py-4 font-mono text-right">{pool.ratio}</td>
                <td className="px-4 py-4 font-mono text-right text-green-400">{pool.apr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}