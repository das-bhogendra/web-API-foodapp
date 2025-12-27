'use client';

import { useParams } from 'next/navigation';

type BlogData = {
  [key: string]: {
    title: string;
    content: string;
  };
};

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const blogId = params.id;

  const blogData: BlogData = {
    '1': { title: 'First Blog', content: 'This is the first blog.' },
    '2': { title: 'Second Blog', content: 'This is the second blog.' },
    '3': { title: 'Third Blog', content: 'This is the third blog.' },
  };

  const blog = blogData[blogId];

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
