export type { ForumComment, ForumPost } from './forum/types';
import type { ForumPost } from './forum/types';
import { forumPostsEn } from './forum/posts/en-threads';

export const forumCategories = [
  { name: 'General Discussion', tone: 'blue', icon: 'users' },
  { name: 'Guides & Tutorials', tone: 'purple', icon: 'navBlog' },
  { name: 'Technical Support', tone: 'green', icon: 'settings' },
  { name: 'Software & Compatibility', tone: 'orange', icon: 'package' },
  { name: 'Gaming Questions', tone: 'blue', icon: 'messageCircle' },
  { name: 'Account & Security', tone: 'orange', icon: 'shieldCheck' },
] as const;

export const forumPosts: ForumPost[] = forumPostsEn;

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
