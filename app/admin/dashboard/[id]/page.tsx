'use client';
import Link from 'next/link';

const blogs = [
  { id: '1', title: 'First Blog' },
  { id: '2', title: 'Second Blog' },
  { id: '3', title: 'Third Blog' },
];

export default function BlogsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Blogs</h1>
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/admin/dashboard/blogs/${blog.id}`}
          className="block p-4 border rounded hover:bg-gray-50"
        >
          {blog.title}
        </Link>
      ))}
    </div>
  );
}
