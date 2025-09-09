import React, { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { usePosts } from "~/context/PostContext";
import type { PostModel } from "~/models/post.model";
import { Navbar } from "./navbar";

export function PostEdit() {
  const { id } = useParams<{ id: string }>();
  const { showPost, updatePost, currentPost } = usePosts();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (currentPost) {
        setLoading(false);
        return;
      }
      if (!id) {
        setError("ID no found");
        setLoading(false);
        return;
      }

      await showPost(parseInt(id));
      setLoading(false);
      setError(null);
    })();
  }, [id, showPost]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setDescription(currentPost.description);
      setDepartment(currentPost.department || "");
      setStatus(currentPost.status);
    }
  }, [currentPost]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError("ID no found.");
      return;
    }

    setSaving(true);
    setError(null);

    const updatedPostData: Partial<PostModel> = {
      title,
      description,
      department: department || undefined,
      status,
    };

    await updatePost(parseInt(id), updatedPostData);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error mx-auto mt-8 w-full max-w-lg">
        <span>{error}</span>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="alert alert-info mx-auto mt-8 w-full max-w-lg">
        <span>Post no found.</span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="card w-full max-w-lg shadow-xl bg-base-100 mx-auto mt-8 p-6">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Update Post</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
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
                className={`btn btn-primary w-full ${saving ? "loading" : ""}`}
                disabled={saving}
              >
                {saving ? "Updatings..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
