// src/app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me - LostSec',
  description: 'Learn more about LostSec, the cybersecurity researcher and bug bounty hunter.',
};

export default function AboutPage() {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-hacker-green mb-6 border-b-2 border-hacker-grey pb-2">
        // About Me
      </h1>
      <div className="space-y-4 text-lg text-gray-300">
        <p>
          [LostSec_] is a seasoned cybersecurity researcher with a passion for uncovering vulnerabilities and strengthening digital defenses.
          My journey into the world of hacking began X years ago, driven by an insatiable curiosity for how systems work and, more importantly, how they break.
        </p>
        <p>
          My expertise lies in [mention specific areas like: web application security, network penetration testing, reverse engineering, malware analysis, etc.].
          I thrive on the challenge of bug bounty hunting, where I've had success in identifying critical flaws in platforms ranging from startups to Fortune 500 companies.
        </p>
        <p>
          This space serves as a repository for my research, tools I've developed, writeups of interesting findings, and thoughts on the ever-evolving landscape of cybersecurity.
        </p>
        <p>
          My philosophy is rooted in ethical hacking – using offensive security techniques to ultimately improve defensive postures. I believe in knowledge sharing and contributing to a more secure digital ecosystem for everyone.
        </p>
        <p>
          When I'm not immersed in code or hunting for bugs, I enjoy [mention a hobby or two, e.g., CTFs, retro gaming, building custom hardware].
        </p>
        <p>
          // Systems online. Awaiting command...
        </p>
      </div>
    </div>
  );
}
