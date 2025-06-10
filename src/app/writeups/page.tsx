// src/app/writeups/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writeups - LostSec',
  description: 'Detailed writeups of bug bounty findings and cybersecurity research by LostSec.',
};

export default function WriteupsPage() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-hacker-green mb-6 border-b-2 border-hacker-grey pb-2">
        // Intel Drops: Writeups
      </h1>
      <div className="space-y-4 text-lg text-gray-300">
        <p>
          This section will feature detailed writeups of interesting vulnerabilities, bug bounty findings, CTF solutions, and research projects.
        </p>
        <p>
          Currently, this section is under development. Writeups will be listed here, similar to the blog, with options to search and filter.
        </p>
        <p>
          // Compiling data... Check back soon for declassified reports.
        </p>
      </div>
    </div>
  );
}
