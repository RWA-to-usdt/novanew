import { Link } from 'react-router-dom';

export default function Careers() {
  const jobs = [
    {
      title: 'Senior Smart Contract Developer',
      location: 'Remote',
      type: 'Full-time',
      desc: 'We are looking for an experienced Solidity developer to build and audit our smart contracts.',
    },
    {
      title: 'Frontend Engineer (React)',
      location: 'Remote',
      type: 'Full-time',
      desc: 'Help us build the best DeFi user experience in the world using React and TypeScript.',
    },
    {
      title: 'Product Designer',
      location: 'Remote',
      type: 'Full-time',
      desc: 'Design intuitive and beautiful interfaces for our decentralized exchange platform.',
    },
    {
      title: 'Community Manager',
      location: 'Remote',
      type: 'Part-time',
      desc: 'Engage with our community across Discord, Twitter, and Telegram.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Careers at NovaSwap</h1>
      <p className="text-gray-400 mb-8">Join us in building the future of decentralized finance.</p>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] hover:border-brand-500/50 transition">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{job.title}</h2>
                <p className="text-gray-400 text-sm">{job.location} · {job.type}</p>
              </div>
              <button className="bg-brand-500/10 text-brand-500 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-brand-500 hover:text-white transition">
                Apply
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3">{job.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}