// src/components/Navbar.tsx
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '/about' },
  { name: 'Writeups', href: '/writeups' },
  { name: 'Tools', href: '/tools' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  return (
    <nav className="bg-hacker-dark border-b border-hacker-grey p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-hacker-green hover:text-hacker-green-dark transition-colors">
          LostSec
        </Link>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-hacker-green hover:text-hacker-green-dark px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-hacker-green"
            >
              {item.name === 'Home' ? '<Home />' : item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
