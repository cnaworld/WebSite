// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-hacker-dark border-t border-hacker-grey p-4 mt-auto">
      <div className="container mx-auto text-center text-sm text-hacker-green-dark">
        <p>&copy; {new Date().getFullYear()} LostSec. All rights reserved.</p>
        <p className="mt-1">Powered by Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}
