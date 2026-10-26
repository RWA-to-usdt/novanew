export const CONFIG = {
  contractAddress: "0x386aC22701d4E0419A2406bE32cD255D2b6c42cE", // ඔයාගේ PaymentProcessor Contract එක
  usdtAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  chainId: 1
};

// USDT ABI (viem/wagmi වලට ගැලපෙන විදිහට)
export const USDT_ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "_spender", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "type": "function"
  }
];

// ටොකන් ලිස්ට් එක (Binance API එකට ගැලපෙන නම් එක්ක)
export const TOKEN_LIST = [
  { name: 'Tether', symbol: 'USDT', binanceSymbol: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=040' },
  { name: 'Ethereum', symbol: 'ETH', binanceSymbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040' },
  { name: 'Bitcoin', symbol: 'WBTC', binanceSymbol: 'BTC', icon: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=040' },
  { name: 'USD Coin', symbol: 'USDC', binanceSymbol: 'USDC', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040' },
  { name: 'Chainlink', symbol: 'LINK', binanceSymbol: 'LINK', icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=040' },
  { name: 'Uniswap', symbol: 'UNI', binanceSymbol: 'UNI', icon: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=040' },
  { name: 'Dai', symbol: 'DAI', binanceSymbol: 'DAI', icon: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040' },
  { name: 'Polygon', symbol: 'MATIC', binanceSymbol: 'MATIC', icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=040' },
  { name: 'Solana', symbol: 'SOL', binanceSymbol: 'SOL', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=040' },
  { name: 'Cardano', symbol: 'ADA', binanceSymbol: 'ADA', icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=040' },
  { name: 'Polkadot', symbol: 'DOT', binanceSymbol: 'DOT', icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=040' },
  { name: 'Avalanche', symbol: 'AVAX', binanceSymbol: 'AVAX', icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png?v=040' },
  { name: 'Shiba Inu', symbol: 'SHIB', binanceSymbol: 'SHIB', icon: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=040' },
  { name: 'Litecoin', symbol: 'LTC', binanceSymbol: 'LTC', icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=040' },
  { name: 'Bitcoin Cash', symbol: 'BCH', binanceSymbol: 'BCH', icon: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=040' },
  { name: 'Stellar', symbol: 'XLM', binanceSymbol: 'XLM', icon: 'https://cryptologos.cc/logos/stellar-xlm-logo.png?v=040' },
  { name: 'Cosmos', symbol: 'ATOM', binanceSymbol: 'ATOM', icon: 'https://cryptologos.cc/logos/cosmos-atom-logo.png?v=040' },
  { name: 'Filecoin', symbol: 'FIL', binanceSymbol: 'FIL', icon: 'https://cryptologos.cc/logos/filecoin-fil-logo.png?v=040' },
  { name: 'Aptos', symbol: 'APT', binanceSymbol: 'APT', icon: 'https://cryptologos.cc/logos/aptos-apt-logo.png?v=040' },
  { name: 'Arbitrum', symbol: 'ARB', binanceSymbol: 'ARB', icon: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=040' },
  { name: 'Optimism', symbol: 'OP', binanceSymbol: 'OP', icon: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=040' },
  { name: 'Injective', symbol: 'INJ', binanceSymbol: 'INJ', icon: 'https://cryptologos.cc/logos/injective-inj-logo.png?v=040' },
  { name: 'Maker', symbol: 'MKR', binanceSymbol: 'MKR', icon: 'https://cryptologos.cc/logos/maker-mkr-logo.png?v=040' },
  { name: 'Aave', symbol: 'AAVE', binanceSymbol: 'AAVE', icon: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=040' },
  { name: 'Curve', symbol: 'CRV', binanceSymbol: 'CRV', icon: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png?v=040' },
  { name: 'Synthetix', symbol: 'SNX', binanceSymbol: 'SNX', icon: 'https://cryptologos.cc/logos/synthetix-network-token-snx-logo.png?v=040' },
  { name: 'Compound', symbol: 'COMP', binanceSymbol: 'COMP', icon: 'https://cryptologos.cc/logos/compound-comp-logo.png?v=040' },
  { name: '1inch', symbol: '1INCH', binanceSymbol: '1INCH', icon: 'https://cryptologos.cc/logos/1inch-1inch-logo.png?v=040' },
  { name: 'Enjin', symbol: 'ENJ', binanceSymbol: 'ENJ', icon: 'https://cryptologos.cc/logos/enjin-coin-enj-logo.png?v=040' },
  { name: 'Decentraland', symbol: 'MANA', binanceSymbol: 'MANA', icon: 'https://cryptologos.cc/logos/decentraland-mana-logo.png?v=040' },
  { name: 'The Sandbox', symbol: 'SAND', binanceSymbol: 'SAND', icon: 'https://cryptologos.cc/logos/the-sandbox-sand-logo.png?v=040' },
  { name: 'Axie Infinity', symbol: 'AXS', binanceSymbol: 'AXS', icon: 'https://cryptologos.cc/logos/axie-infinity-axs-logo.png?v=040' },
  { name: 'Gala', symbol: 'GALA', binanceSymbol: 'GALA', icon: 'https://cryptologos.cc/logos/gala-gala-logo.png?v=040' },
  { name: 'Fantom', symbol: 'FTM', binanceSymbol: 'FTM', icon: 'https://cryptologos.cc/logos/fantom-ftm-logo.png?v=040' },
  { name: 'Near', symbol: 'NEAR', binanceSymbol: 'NEAR', icon: 'https://cryptologos.cc/logos/near-protocol-near-logo.png?v=040' },
  { name: 'Algorand', symbol: 'ALGO', binanceSymbol: 'ALGO', icon: 'https://cryptologos.cc/logos/algorand-algo-logo.png?v=040' },
  { name: 'VeChain', symbol: 'VET', binanceSymbol: 'VET', icon: 'https://cryptologos.cc/logos/vechain-vet-logo.png?v=040' },
  { name: 'Hedera', symbol: 'HBAR', binanceSymbol: 'HBAR', icon: 'https://cryptologos.cc/logos/hedera-hbar-logo.png?v=040' },
  { name: 'Internet Computer', symbol: 'ICP', binanceSymbol: 'ICP', icon: 'https://cryptologos.cc/logos/internet-computer-icp-logo.png?v=040' },
  { name: 'Render', symbol: 'RNDR', binanceSymbol: 'RNDR', icon: 'https://cryptologos.cc/logos/render-token-rndr-logo.png?v=040' },
  { name: 'Immutable', symbol: 'IMX', binanceSymbol: 'IMX', icon: 'https://cryptologos.cc/logos/immutable-x-imx-logo.png?v=040' },
  { name: 'Stacks', symbol: 'STX', binanceSymbol: 'STX', icon: 'https://cryptologos.cc/logos/stacks-stx-logo.png?v=040' },
  { name: 'Theta', symbol: 'THETA', binanceSymbol: 'THETA', icon: 'https://cryptologos.cc/logos/theta-network-theta-logo.png?v=040' },
  { name: 'Flow', symbol: 'FLOW', binanceSymbol: 'FLOW', icon: 'https://cryptologos.cc/logos/flow-flow-logo.png?v=040' },
  { name: 'EOS', symbol: 'EOS', binanceSymbol: 'EOS', icon: 'https://cryptologos.cc/logos/eos-eos-logo.png?v=040' },
  { name: 'Tezos', symbol: 'XTZ', binanceSymbol: 'XTZ', icon: 'https://cryptologos.cc/logos/tezos-xtz-logo.png?v=040' },
  { name: 'Neo', symbol: 'NEO', binanceSymbol: 'NEO', icon: 'https://cryptologos.cc/logos/neo-neo-logo.png?v=040' },
  { name: 'IOTA', symbol: 'IOTA', binanceSymbol: 'IOTA', icon: 'https://cryptologos.cc/logos/iota-miota-logo.png?v=040' },
  { name: 'Kava', symbol: 'KAVA', binanceSymbol: 'KAVA', icon: 'https://cryptologos.cc/logos/kava-kava-logo.png?v=040' },
  { name: 'Zilliqa', symbol: 'ZIL', binanceSymbol: 'ZIL', icon: 'https://cryptologos.cc/logos/zilliqa-zil-logo.png?v=040' },
  { name: 'Harmony', symbol: 'ONE', binanceSymbol: 'ONE', icon: 'https://cryptologos.cc/logos/harmony-one-logo.png?v=040' },
  { name: 'Celo', symbol: 'CELO', binanceSymbol: 'CELO', icon: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=040' },
  { name: 'Kusama', symbol: 'KSM', binanceSymbol: 'KSM', icon: 'https://cryptologos.cc/logos/kusama-ksm-logo.png?v=040' },
  { name: 'Dash', symbol: 'DASH', binanceSymbol: 'DASH', icon: 'https://cryptologos.cc/logos/dash-dash-logo.png?v=040' },
  { name: 'Zcash', symbol: 'ZEC', binanceSymbol: 'ZEC', icon: 'https://cryptologos.cc/logos/zcash-zec-logo.png?v=040' },
  { name: 'Monero', symbol: 'XMR', binanceSymbol: 'XMR', icon: 'https://cryptologos.cc/logos/monero-xmr-logo.png?v=040' },
  { name: 'Arweave', symbol: 'AR', binanceSymbol: 'AR', icon: 'https://cryptologos.cc/logos/arweave-ar-logo.png?v=040' },
  { name: 'Sushi', symbol: 'SUSHI', binanceSymbol: 'SUSHI', icon: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png?v=040' },
  { name: 'Yearn', symbol: 'YFI', binanceSymbol: 'YFI', icon: 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png?v=040' },
  { name: 'Balancer', symbol: 'BAL', binanceSymbol: 'BAL', icon: 'https://cryptologos.cc/logos/balancer-bal-logo.png?v=040' },
  { name: 'Lido', symbol: 'LDO', binanceSymbol: 'LDO', icon: 'https://cryptologos.cc/logos/lido-dao-ldo-logo.png?v=040' },
];

// Live Prices ගන්නා function එක (Binance API)
export const fetchLivePrices = async () => {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price');
    const data = await response.json();
    const prices = {};
    TOKEN_LIST.forEach(token => {
      const pair = `${token.binanceSymbol}USDT`;
      const found = data.find(item => item.symbol === pair);
      if (found) {
        prices[token.symbol] = parseFloat(found.price);
      } else if (token.symbol === 'USDT' || token.symbol === 'USDC' || token.symbol === 'DAI') {
        prices[token.symbol] = 1;
      } else {
        prices[token.symbol] = 0.01; 
      }
    });
    return prices;
  } catch (error) {
    console.error("Error fetching live prices:", error);
    return {};
  }
};

// Pools සඳහා Mock Data (අලුත් කරපු එක)
export const MOCK_POOLS = [
  { 
    rank: 1, 
    pair: 'RLUSD/USDS', 
    version: 'v4 · 0.0005%', 
    tvl: '$50.0M', 
    vol1d: '$166.9M', 
    vol30d: '$627.4M', 
    ratio: '3.34', 
    apr: '0.61%', 
    icons: [
      'https://cryptologos.cc/logos/tether-usdt-logo.png?v=040', 
      'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040'
    ] 
  },
  { 
    rank: 2, 
    pair: 'USDC/USDT', 
    version: 'v4 · Dynamic', 
    tvl: '$5.8M', 
    vol1d: '$78.3M', 
    vol30d: '$2.9B', 
    ratio: '13.41', 
    apr: '3.82%', 
    icons: [
      'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040', 
      'https://cryptologos.cc/logos/tether-usdt-logo.png?v=040'
    ] 
  },
  { 
    rank: 3, 
    pair: 'ETH/USDC', 
    version: 'v3 · 0.01%', 
    tvl: '$13.1M', 
    vol1d: '$73.2M', 
    vol30d: '$6.8B', 
    ratio: '5.59', 
    apr: '15.29%', 
    icons: [
      'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040', 
      'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040'
    ] 
  },
  { 
    rank: 4, 
    pair: 'ETH/USDC', 
    version: 'v4 · 0.05%', 
    tvl: '$5.7M', 
    vol1d: '$49.1M', 
    vol30d: '$127.5M', 
    ratio: '8.56', 
    apr: '156.32%', 
    icons: [
      'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040', 
      'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040'
    ] 
  },
  { 
    rank: 5, 
    pair: 'ETH/USDC', 
    version: 'v3 · 0.3%', 
    tvl: '$159.1M', 
    vol1d: '$39.5M', 
    vol30d: '$2.2B', 
    ratio: '0.25', 
    apr: '22.64%', 
    icons: [
      'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040', 
      'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040'
    ] 
  }
];

// Market Data (Volume, Market Cap) සඳහා
export const fetchMarketData = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,usd-coin,chainlink,uniswap,dai,matic-network,solana,cardano'
    );
    const data = await response.json();
    const marketData = {};
    data.forEach(coin => {
      marketData[coin.symbol.toUpperCase()] = {
        volume: coin.total_volume,
        marketCap: coin.market_cap,
        priceChange: coin.price_change_percentage_24h
      };
    });
    return marketData;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return {};
  }
};