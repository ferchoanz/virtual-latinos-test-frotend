import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePosts } from "~/context/PostContext";
import { ApplicantsTable } from "./applicantsTable";
import { Navbar } from "./navbar";

export function PostShow() {
  const { id } = useParams<{ id: string }>();
  const { currentPost, showPost } = usePosts();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (currentPost) {
        setLoading(false);
        return;
      }
      if (!id) {
        setError("ID no found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      await showPost(parseInt(id));
      setLoading(false);
    })();
  });

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
    <div className="card w-full max-w-lg shadow-xl bg-base-100 mx-auto mt-8">
      <div className="card-body">
        <h1 className="card-title text-3xl font-bold">{currentPost.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Created At: {currentPost.createdAt}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Updated At: {currentPost.updatedAt}
        </p>
        <div className="prose mb-4">
          <p>{currentPost.description}</p>
        </div>
        <div className="badge badge-info mb-2">
          Department: {currentPost.department || "N/A"}
        </div>
        <div className="badge badge-secondary">
          Status: {currentPost.status.toUpperCase()}
        </div>
      </div>

      {id && <ApplicantsTable id={parseInt(id)} />}
    </div>
    </>
  );
}
