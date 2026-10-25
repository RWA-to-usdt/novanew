import { useState, useEffect } from 'react';
import { TOKEN_LIST, fetchLivePrices, fetchMarketData } from '../config';

export default function TokenTable() {
  const [prices, setPrices] = useState({});
  const [marketData, setMarketData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const liveData = await fetchLivePrices();
      setPrices(liveData);
      
      const marketInfo = await fetchMarketData();
      setMarketData(marketInfo);
    };
    
    getData();
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (!num) return '$---';
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <table className="w-full data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Token</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Volume (24h)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {TOKEN_LIST.map((token, index) => {
            const price = prices[token.symbol] || 0;
            const info = marketData[token.symbol] || {};
            const change = info.priceChange || 0;
            const isPositive = change >= 0;
            
            return (
              <tr key={token.symbol}>
                <td className="text-gray-500">{index + 1}</td>
                <td className="flex items-center space-x-3">
                  <img src={token.icon} className="w-6 h-6 rounded-full" alt={token.symbol} />
                  <div>
                    <div className="font-semibold text-white">{token.name}</div>
                    <div className="text-xs text-gray-500">{token.symbol}</div>
                  </div>
                </td>
                <td className="font-mono">
                  ${price > 0 ? (price < 1 ? price.toFixed(6) : price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})) : '---'}
                </td>
                <td className={isPositive ? 'text-green-400' : 'text-red-400'}>
                  {info.priceChange ? `${isPositive ? '+' : ''}${change.toFixed(2)}%` : '---'}
                </td>
                <td className="font-mono text-gray-400">
                  {info.volume ? formatNumber(info.volume) : '---'}
                </td>
                <td className="font-mono text-gray-400">
                  {info.marketCap ? formatNumber(info.marketCap) : '---'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}