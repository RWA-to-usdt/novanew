import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TOKEN_LIST } from '../config';

export default function TokenModal({ isOpen, onClose, onSelect, livePrices }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Search කරන විදිහට ටොකන් filter කරනවා
  const filteredTokens = TOKEN_LIST.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#131A2A] border border-[#293249] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#293249] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Select a token</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="flex items-center bg-[#0D111C] border border-[#293249] rounded-xl px-3 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search by name or paste address" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500" 
            />
          </div>
        </div>

        {/* Token List */}
        <div className="overflow-y-auto flex-grow p-2">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => {
              const price = livePrices[token.symbol] || 1;
              return (
                <button
                  key={token.symbol}
                  onClick={() => { onSelect(token); onClose(); }}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#1B2236] rounded-xl transition text-left"
                >
                  <div className="flex items-center space-x-3">
                    <img src={token.icon} className="w-8 h-8 rounded-full" alt={token.symbol} />
                    <div>
                      <div className="font-semibold text-white">{token.name}</div>
                      <div className="text-xs text-gray-500">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-white">
                      ${price < 1 ? price.toFixed(6) : price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-8 text-sm">No tokens found.</div>
          )}
        </div>

      </div>
    </div>
  );
}