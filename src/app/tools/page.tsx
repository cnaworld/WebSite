// src/app/tools/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools - LostSec',
  description: 'A collection of cybersecurity tools developed or recommended by LostSec.',
};

export default function ToolsPage() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-hacker-green mb-6 border-b-2 border-hacker-grey pb-2">
        // Arsenal: Tools & Utilities
      </h1>
      <div className="space-y-6 text-lg text-gray-300">
        <p>
          This section is dedicated to the tools of the trade. Some are custom scripts I've developed, while others are staples in the cybersecurity community that I frequently use and recommend.
        </p>

        {/* Example Tool Entry - Repeat this structure for each tool */}
        <div className="p-4 border border-hacker-grey rounded-md shadow-lg hover:shadow-hacker-green/30 transition-shadow">
          <h2 className="text-2xl font-semibold text-hacker-green mb-2">ToolName_v1.py</h2>
          <p className="text-sm text-gray-400 mb-2">Category: [e.g., Reconnaissance, Exploitation, Forensics]</p>
          <p>
            A brief description of the tool, its purpose, and key features.
            For example: "A Python-based script for automating subdomain enumeration using various APIs and techniques."
          </p>
          <div className="mt-3">
            <a href="#" className="text-hacker-green-dark hover:text-hacker-green underline mr-4">GitHub Link</a>
            <a href="#" className="text-hacker-green-dark hover:text-hacker-green underline">Documentation (if any)</a>
          </div>
        </div>

        <div className="p-4 border border-hacker-grey rounded-md shadow-lg hover:shadow-hacker-green/30 transition-shadow">
          <h2 className="text-2xl font-semibold text-hacker-green mb-2">AnotherTool.sh</h2>
          <p className="text-sm text-gray-400 mb-2">Category: [e.g., Automation, Reporting]</p>
          <p>
            Description for another tool. "This shell script helps in organizing findings and generating initial report templates."
          </p>
          <div className="mt-3">
            <a href="#" className="text-hacker-green-dark hover:text-hacker-green underline">Download Script</a>
          </div>
        </div>

        <p className="mt-8">
          // More tools loading... please stand by.
        </p>
      </div>
    </div>
  );
}
