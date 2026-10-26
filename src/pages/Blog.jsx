import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    { title: 'Introducing NovaSwap V2', date: 'October 20, 2026', excerpt: 'We are excited to announce the launch of NovaSwap V2 with faster swaps, lower fees, and a brand new UI.', category: 'Product' },
    { title: 'How to Provide Liquidity', date: 'October 15, 2026', excerpt: 'Learn how to earn passive income by providing liquidity to our pools.', category: 'Tutorial' },
    { title: 'Security Update', date: 'October 10, 2026', excerpt: 'We have completed our latest security audit. Here are the results.', category: 'Security' },
    { title: 'NovaSwap Partners with Chainlink', date: 'October 5, 2026', excerpt: 'We are integrating Chainlink price feeds for more accurate pricing.', category: 'Partnership' },
    { title: 'The Future of DeFi', date: 'September 28, 2026', excerpt: 'Our CEO shares his thoughts on where DeFi is headed in 2027.', category: 'Opinion' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">NovaSwap Blog</h1>
        <p className="text-gray-400">Latest news, tutorials, and insights from the team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] hover:border-brand-500/50 transition cursor-pointer">
            <span className="text-xs font-semibold text-brand-500 bg-brand-500/10 px-2 py-1 rounded">{post.category}</span>
            <h2 className="text-xl font-bold mt-3 mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{post.date}</p>
            <p className="text-gray-400 text-sm">{post.excerpt}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}