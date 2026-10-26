import { Link } from 'react-router-dom';

export default function Cookie() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
      <p className="text-gray-400 mb-8">Last updated: October 26, 2026</p>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Cookies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the platform to function (e.g., wallet connection).</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our site.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. Third-Party Cookies</h2>
          <p>We may use third-party services like Google Analytics that set their own cookies. These are governed by their respective privacy policies.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Managing Cookies</h2>
          <p>You can control and delete cookies through your browser settings. However, disabling essential cookies may affect the functionality of NovaSwap.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. Contact Us</h2>
          <p>For questions about our Cookie Policy, contact us at <a href="mailto:privacy@novaswap.com" className="text-brand-500 hover:underline">privacy@novaswap.com</a>.</p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#293249]">
        <Link to="/" className="text-brand-500 hover:underline">&larr; Back to Home</Link>
      </div>
    </div>
  );
}