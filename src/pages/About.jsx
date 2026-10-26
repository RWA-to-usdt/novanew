import { Link } from 'react-router-dom';
import { FaGlobe, FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';

export default function About() {
  const team = [
    { name: 'Sumudu N. Wijesekara', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Alex Chen', role: 'CTO', emoji: '👨‍💻' },
    { name: 'Sarah Kim', role: 'Head of Product', emoji: '👩‍🎨' },
    { name: 'David Miller', role: 'Lead Smart Contract Dev', emoji: '👨‍🔧' },
  ];

  const values = [
    { icon: <FaShieldAlt className="text-2xl text-brand-500" />, title: 'Security First', desc: 'We never compromise on security. Your funds are always safe.' },
    { icon: <FaUsers className="text-2xl text-blue-400" />, title: 'Community Driven', desc: 'Built by the community, for the community.' },
    { icon: <FaRocket className="text-2xl text-purple-400" />, title: 'Innovation', desc: 'Constantly pushing the boundaries of DeFi.' },
    { icon: <FaGlobe className="text-2xl text-green-400" />, title: 'Accessible', desc: 'DeFi for everyone, everywhere.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About NovaSwap</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">We are a team of DeFi enthusiasts on a mission to make decentralized trading accessible to everyone.</p>
      </div>

      <div className="bg-gradient-to-r from-[#131A2A] to-[#0D111C] p-8 rounded-3xl border border-[#293249] mb-16">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-300 leading-relaxed">NovaSwap was founded in 2024 by a group of developers who were frustrated with the complexity and high fees of existing DEX platforms. We set out to build a platform that was fast, secure, and affordable. Today, NovaSwap processes millions in daily volume and serves users in over 100 countries.</p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {values.map((v, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] flex items-start space-x-4">
            <div className="mt-1">{v.icon}</div>
            <div>
              <h3 className="text-lg font-bold mb-1">{v.title}</h3>
              <p className="text-gray-400 text-sm">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
        {team.map((member, index) => (
          <div key={index} className="bg-[#131A2A] p-6 rounded-2xl border border-[#293249] text-center">
            <div className="text-4xl mb-2">{member.emoji}</div>
            <h3 className="font-bold text-white">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}