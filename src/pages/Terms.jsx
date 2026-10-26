import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-400 mb-8">Last updated: October 26, 2026</p>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using NovaSwap, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. Eligibility</h2>
          <p>You must be at least 18 years old and have the legal capacity to enter into these Terms. You are responsible for ensuring that your use of NovaSwap complies with all applicable laws.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. Use of Service</h2>
          <p>NovaSwap provides a decentralized exchange platform. You are solely responsible for your own wallet and private keys. We do not have access to your funds and cannot recover them if lost.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Risks</h2>
          <p>Cryptocurrency trading involves significant risk. Prices can be volatile, and you may lose all of your funds. You should only trade with funds you can afford to lose.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using the service for illegal purposes</li>
            <li>Attempting to manipulate the platform</li>
            <li>Interfering with other users' access</li>
            <li>Reverse engineering or attempting to extract source code</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Limitation of Liability</h2>
          <p>NovaSwap is provided "as is" without any warranties. We are not liable for any losses or damages arising from your use of the platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Your continued use of NovaSwap after any changes constitutes acceptance of the new terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">8. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:legal@novaswap.com" className="text-brand-500 hover:underline">legal@novaswap.com</a>.</p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}