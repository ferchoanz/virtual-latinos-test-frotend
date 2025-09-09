import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { usePosts } from "~/context/PostContext";
import type { PostModel } from "~/models/post.model";
import { Navbar } from "./navbar";

export function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("active"); // Estado por defecto
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { addPost, } = usePosts();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newPostData: Partial<PostModel> = {
      title,
      description,
      department: department || undefined,
      status,
    };

    await addPost(newPostData);
    setLoading(false);
    // navigate("/posts");
  };

  return (
    <>
      <Navbar />
      <div className="card w-full max-w-lg shadow-xl bg-base-100 mx-auto mt-8 p-6">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            Create New Post
          </h2>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Department (opcional)</span>
              </label>
              <input
                type="text"
                placeholder="E.g. Marketing, Sales"
                className="input input-bordered w-full"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
