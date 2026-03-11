"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogApi } from "@/app/lib/api/admin/blog";

interface BlogItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const AdminBlogEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      blogApi.getById(id as string).then((data) => {
        setBlog(data);
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    const token = localStorage.getItem("token") || "";
    await blogApi.update(id as string, formData, token);
    router.push("/admin/blogs");
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full h-40"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Blog</button>
      </form>
    </div>
  );
};

export default AdminBlogEditPage;
