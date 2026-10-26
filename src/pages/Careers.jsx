export default function Careers() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Careers at NovaSwap</h1>
      <p className="text-gray-400 mb-8">Join us in building the future of decentralized finance.</p>
      <div className="space-y-4">
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <h2 className="text-xl font-bold text-white mb-2">Senior Smart Contract Developer</h2>
          <p className="text-gray-400 mb-4">Remote · Full-time</p>
          <p className="text-sm text-gray-500">We are looking for an experienced Solidity developer to join our team.</p>
        </div>
        <div className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249]">
          <h2 className="text-xl font-bold text-white mb-2">Frontend Engineer (React)</h2>
          <p className="text-gray-400 mb-4">Remote · Full-time</p>
          <p className="text-sm text-gray-500">Help us build the best DeFi user experience in the world.</p>
        </div>
      </div>
    </div>
  );
}