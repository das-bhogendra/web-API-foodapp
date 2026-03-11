"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { blogApi } from "@/app/lib/api/admin/blog";

const AdminBlogCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    const token = localStorage.getItem("token") || "";
    await blogApi.create(formData, token);
    router.push("/admin/blogs");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Blog</button>
      </form>
    </div>
  );
};

export default AdminBlogCreatePage;