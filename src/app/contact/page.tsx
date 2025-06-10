// src/app/contact/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - LostSec',
  description: 'Get in touch with LostSec for collaborations, inquiries, or discussions.',
};

export default function ContactPage() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-hacker-green mb-6 border-b-2 border-hacker-grey pb-2">
        // Contact Signal
      </h1>
      <div className="space-y-4 text-lg text-gray-300">
        <p>
          For inquiries, collaborations, or if you just want to discuss the latest vulnerabilities, feel free to reach out.
        </p>
        <p>
          Preferred channels:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Email:</strong> <a href="mailto:contact@example.com" className="text-hacker-green hover:underline">contact@lostsec.xyz</a> (Replace with actual email)</li>
          <li><strong>Twitter/X:</strong> <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-hacker-green hover:underline">@YourTwitterHandle</a> (Replace)</li>
          <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-hacker-green hover:underline">Your LinkedIn Profile</a> (Replace)</li>
          <li><strong>GitHub:</strong> <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-hacker-green hover:underline">Your GitHub Profile</a> (Replace)</li>
        </ul>
        <p className="mt-6">
          PGP Key for secure communication: [Link to PGP key or key fingerprint here]
        </p>
        <p>
          // Channel open. Listening for incoming transmissions...
        </p>
      </div>
      {/* Basic Form (Optional - for static site, might link to a service or just display info) */}
      <form className="mt-8 space-y-4 max-w-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-hacker-green-dark">Name_</label>
          <input type="text" name="name" id="name" className="mt-1 block w-full bg-hacker-dark border border-hacker-grey rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-hacker-green focus:border-hacker-green text-gray-300" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-hacker-green-dark">Email_</label>
          <input type="email" name="email" id="email" className="mt-1 block w-full bg-hacker-dark border border-hacker-grey rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-hacker-green focus:border-hacker-green text-gray-300" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-hacker-green-dark">Message_</label>
          <textarea name="message" id="message" rows={4} className="mt-1 block w-full bg-hacker-dark border border-hacker-grey rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-hacker-green focus:border-hacker-green text-gray-300"></textarea>
        </div>
        <div>
          <button type="submit" className="px-4 py-2 border border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-hacker-dark font-semibold rounded-md transition-colors">
            Send_Signal &gt;
          </button>
        </div>
        <p className="text-xs text-gray-500">Note: This is a static form. For actual submission, integrate with a service like Formspree, Netlify Forms, or a custom backend.</p>
      </form>
    </div>
  );
}
