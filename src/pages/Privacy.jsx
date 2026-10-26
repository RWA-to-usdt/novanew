import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-400 mb-8">Last updated: October 26, 2026</p>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
          <p>At NovaSwap, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our decentralized exchange platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Blockchain Data:</strong> When you connect your wallet, we may read your public wallet address and transaction history. This information is publicly available on the blockchain.</li>
            <li><strong>Usage Data:</strong> We may collect anonymous data about how you interact with our platform, such as pages visited and features used.</li>
            <li><strong>Device Information:</strong> We may collect information about your browser, operating system, and device type.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Improve and personalize your experience</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Sharing Your Information</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With service providers who assist us in operating our platform</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and property</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. Security</h2>
          <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@novaswap.com" className="text-brand-500 hover:underline">privacy@novaswap.com</a>.</p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}