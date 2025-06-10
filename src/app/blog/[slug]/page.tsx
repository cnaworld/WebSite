// src/app/blog/[slug]/page.tsx
import { getPostData, getAllPostSlugs, PostData } from '@/lib/posts';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose a dark theme for syntax highlighting that fits the hacker aesthetic
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
// You might need to explicitly register languages if using PrismAsyncLight and they aren't common
// import { jsx, javascript, bash, css, python, markdown } from 'react-syntax-highlighter/dist/esm/languages/prism';
// SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('javascript', javascript);
// etc.
import Link from 'next/link'; // Added Link import

type Props = {
  params: {
    slug: string;
  };
};

// This function is needed for Next.js to know which slugs are valid at build time
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); // This function should return an array of { params: { slug: '...' } }
  return paths.map(p => ({ slug: p.params.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    return {
      title: `${post.title} - LostSec Blog`,
      description: post.excerpt || 'Blog post by LostSec',
    };
  } catch (error) {
    return {
      title: 'Post Not Found - LostSec Blog',
      description: 'This blog post could not be found.',
    };
  }
}

// Helper to extract language from className (e.g., "language-javascript")
const getLanguage = (node: Element): string | null => {
  if (node.attribs && node.attribs.class) {
    const match = /language-(\w+)/.exec(node.attribs.class);
    return match ? match[1] : null;
  }
  return null;
};

const parserOptions: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element && domNode.tagName === 'pre') {
      const codeElement = domNode.children.find(child => child instanceof Element && child.tagName === 'code') as Element | undefined;
      if (codeElement && codeElement.children.length > 0 && codeElement.children[0].type === 'text') {
        const codeString = codeElement.children[0].data;
        const language = getLanguage(codeElement);

        return (
          <SyntaxHighlighter
            language={language || 'plaintext'} // Default to plaintext if no language class
            style={tomorrow} // Or another dark theme like 'okaidia', 'atomDark', 'vscDarkPlus'
            PreTag="div" // Use div instead of pre to avoid nesting <pre>
            showLineNumbers={true}
            customStyle={{
              borderRadius: '0.375rem', // Corresponds to rounded-md
              padding: '1em',
              margin: '0.5em 0',
              backgroundColor: '#1e1e1e', // A slightly different dark for code blocks
              fontSize: '0.875em', // text-sm
            }}
            codeTagProps={{
                style: {
                    fontFamily: '"JetBrains Mono", monospace' // Ensure code font
                }
            }}
          >
            {codeString.trim()}
          </SyntaxHighlighter>
        );
      }
    }
    // Let default parser handle other elements
    return undefined;
  }
};

export default async function BlogPostPage({ params }: Props) {
  let post: PostData & { contentHtml: string };
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    notFound(); // This will render the not-found.tsx page or a default 404
  }

  return (
    <article className="py-10">
      <header className="mb-8 text-center border-b-2 border-hacker-grey pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-hacker-green mb-3">
          {post.title}
        </h1>
        <div className="text-sm text-hacker-green-dark">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <span className="mx-2">| Tags:</span>
          )}
          {post.tags.map(tag => (
            <Link key={tag} href="/blog" className="ml-2 bg-hacker-grey text-hacker-green px-2 py-0.5 rounded text-xs hover:bg-hacker-green hover:text-hacker-dark transition-colors">
                #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-hacker-green prose-headings:border-b prose-headings:border-hacker-grey
                    prose-a:text-hacker-green-dark prose-a:underline hover:prose-a:text-hacker-green
                    prose-strong:text-hacker-green
                    prose-blockquote:border-l-hacker-green prose-blockquote:text-gray-400
                    prose-code:bg-hacker-dark prose-code:text-hacker-green prose-code:p-1 prose-code:rounded-sm prose-code:font-mono
                    prose-li:marker:text-hacker-green">
        {parse(post.contentHtml, parserOptions)}
      </div>

      <div className="mt-12 text-center">
        <Link href="/blog" className="text-hacker-green hover:text-hacker-green-dark font-semibold hover:underline transition-colors">
          &lt;&lt; Back to Blog Feed
        </Link>
      </div>
    </article>
  );
}
