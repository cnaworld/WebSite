// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  contentHtml?: string; // Optional because it's not needed for list view
  excerpt?: string; // Optional: a short summary
  // Add any other frontmatter fields you expect
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (err) {
    // If the directory doesn't exist or is empty, return an empty array
    console.warn("Posts directory not found or empty. If you haven't created any posts yet, this is normal.");
    return [];
  }

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx')) // Only include markdown files
    .map(fileName => {
      // Remove ".md" or ".mdx" from file name to get id
      const slug = fileName.replace(/\.(md|mdx)$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Create an excerpt (first 150 characters of content, or custom frontmatter field)
      let excerpt = '';
      if (matterResult.data.excerpt) {
        excerpt = matterResult.data.excerpt;
      } else if (matterResult.content) {
        // Basic excerpt from content (plain text, first ~20 lines or 150 chars)
        // For a better excerpt, you might process the markdown lightly
        excerpt = matterResult.content.split('\n').slice(0,5).join(' ').substring(0, 150) + '...';
      }


      // Combine the data with the id
      return {
        slug,
        title: matterResult.data.title || 'Untitled Post', // Default title
        date: matterResult.data.date || new Date().toISOString().split('T')[0], // Default date
        tags: matterResult.data.tags || [], // Default tags
        excerpt,
        ...(matterResult.data as { date?: string; title?: string; tags?: string[], excerpt?: string }),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData & { contentHtml: string }> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  let fileContents;

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    // If the .md file doesn't exist, try .mdx
    try {
      const mdxFullPath = path.join(postsDirectory, `${slug}.mdx`);
      fileContents = fs.readFileSync(mdxFullPath, 'utf8');
    } catch (mdxErr) {
      // If neither exists, throw an error or handle as "not found"
      console.error(`Error reading post file: ${slug}.md or ${slug}.mdx`, err, mdxErr);
      throw new Error(`Post not found: ${slug}`);
    }
  }


  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Be cautious with sanitize: false if MD content is user-generated
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  let excerpt = '';
  if (matterResult.data.excerpt) {
    excerpt = matterResult.data.excerpt;
  } else if (matterResult.content) {
    excerpt = matterResult.content.split('\n').slice(0,5).join(' ').substring(0, 150) + '...';
  }

  // Combine the data with the id and contentHtml
  return {
    slug,
    title: matterResult.data.title || 'Untitled Post',
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    tags: matterResult.data.tags || [],
    contentHtml,
    excerpt,
    ...(matterResult.data as { date?: string; title?: string; tags?: string[]; excerpt?: string }),
  };
}

export function getAllPostSlugs() {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (err) {
    return []; // Return empty if directory doesn't exist
  }

  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.(md|mdx)$/, ''),
        },
      };
    });
}
