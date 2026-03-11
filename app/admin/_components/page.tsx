"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { blogApi } from "@/app/lib/api/admin/blog";

interface BlogItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  const fetchBlogs = async () => {
    const data = await blogApi.getAll();
    setBlogs(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const token = localStorage.getItem("token") || "";
    await blogApi.delete(id, token);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <Link href="/admin/blogs/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Blog
      </Link>
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
            <p className="text-sm">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
            <div className="mt-2">
              <Link href={`/admin/blogs/${blog._id}`} className="text-blue-500 mr-4">View</Link>
              <Link href={`/admin/blogs/${blog._id}/edit`} className="text-green-500 mr-4">Edit</Link>
              <button onClick={() => handleDelete(blog._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogsPage;
