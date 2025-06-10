// src/app/blog/page.tsx
'use client'; // For useState, useEffect

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/lib/posts'; // Adjust path if needed

// Simulate fetching data on the client for interactivity.
// In a real App Router scenario for initial load, you'd fetch this in the Server Component part.
// However, for dynamic filtering/searching, client-side logic is fine.

export default function BlogIndexPage() {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc');

  // In a real App Router setup, initial data fetching would ideally be done
  // in a Server Component. For this client component, we fetch it in useEffect.
  useEffect(() => { // Added missing braces for useEffect
    setAllPosts(getSortedPostsData());
  }, []);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allPosts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, [allPosts]);

  const filteredAndSortedPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by search term (title or excerpt)
    if (searchTerm) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }

    // Sort posts
    posts.sort((a, b) => {
      switch (sortOrder) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-desc':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return posts;
  }, [allPosts, searchTerm, selectedTag, sortOrder]);

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-hacker-green mb-8 border-b-2 border-hacker-grey pb-2">
        // Blog_Feed
      </h1>

      {/* Controls: Search, Tags, Sort */}
      <div className="mb-8 p-4 border border-hacker-grey rounded-lg bg-hacker-dark/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-hacker-green-dark mb-1">Search_</label>
            <input
              type="text"
              id="search"
              placeholder="Enter keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-hacker-dark border border-hacker-grey rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-hacker-green focus:border-hacker-green text-gray-300"
            />
          </div>

          {/* Tag Filter */}
          <div>
            <label htmlFor="tag-filter" className="block text-sm font-medium text-hacker-green-dark mb-1">Filter_by_Tag_</label>
            <select
              id="tag-filter"
              value={selectedTag || ''}
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className="w-full bg-hacker-dark border border-hacker-grey rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-hacker-green focus:border-hacker-green text-gray-300"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label htmlFor="sort-order" className="block text-sm font-medium text-hacker-green-dark mb-1">Sort_By_</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full bg-hacker-dark border border-hacker-grey rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-hacker-green focus:border-hacker-green text-gray-300"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Post List */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="space-y-8">
          {filteredAndSortedPosts.map(post => (
            <article key={post.slug} className="p-6 border border-hacker-grey rounded-lg hover:border-hacker-green transition-colors duration-200 ease-in-out bg-hacker-dark/50 shadow-lg hover:shadow-hacker-green/20">
              <header>
                <h2 className="text-3xl font-semibold text-hacker-green mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <div className="text-sm text-hacker-green-dark mb-2">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  {post.tags && post.tags.length > 0 && (
                    <span className="mx-2">|</span>
                  )}
                  {post.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="ml-2 bg-hacker-grey text-hacker-green px-2 py-0.5 rounded text-xs hover:bg-hacker-green hover:text-hacker-dark transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </header>
              {post.excerpt && (
                <p className="text-gray-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              )}
              <Link href={`/blog/${post.slug}`} className="text-hacker-green hover:text-hacker-green-dark font-semibold hover:underline transition-colors">
                Read_more &gt;&gt;
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xl">
          // No posts found matching your criteria. Adjust filters or check back later.
        </p>
      )}
    </div>
  );
}
