"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { blogApi } from "@/app/lib/api/admin/blog";

interface BlogItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const AdminBlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogItem | null>(null);

  useEffect(() => {
    if (id) {
      blogApi.getById(id as string).then(setBlog);
    }
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="prose">{blog.content}</div>
      <div className="mt-4">
        <Link href={`/admin/blogs/${blog._id}/edit`} className="text-green-500 mr-4">Edit</Link>
        <Link href="/admin/blogs" className="text-blue-500">Back to Blogs</Link>
      </div>
    </div>
  );
};

export default AdminBlogDetailPage;
