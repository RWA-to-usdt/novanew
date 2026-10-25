import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { fetchLivePrices } from '../config';

export default function MarketTicker() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const prices = await fetchLivePrices();
        
        // අපිට ඕනේ ප්‍රධාන ටොකන් ටික විතරයි
        const mainTokens = ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'BNB'];
        const formattedData = mainTokens.map(symbol => {
          const price = prices[symbol] || 0;
          // Mock change (පස්සේ හදමු)
          const change = (Math.random() * 10 - 5).toFixed(2);
          
          return {
            symbol,
            price,
            change
          };
        }).filter(item => item.price > 0);
        
        setMarketData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Market data error:", error);
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 text-sm py-4">Loading live market data...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="flex flex-wrap justify-center gap-4 bg-[#131A2A] border border-[#293249] rounded-2xl p-4">
        {marketData.map((coin) => {
          const isPositive = parseFloat(coin.change) >= 0;
          return (
            <div key={coin.symbol} className="flex items-center space-x-2 px-4 py-2 bg-[#0D111C] rounded-xl border border-white/5">
              <span className="font-bold text-white">{coin.symbol}</span>
              <span className="text-gray-300">
                ${coin.price < 1 ? coin.price.toFixed(6) : coin.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
              <span className={`text-xs flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {Math.abs(coin.change)}%
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-gray-600 mt-2">Live data powered by Binance</p>
    </div>
  );
}