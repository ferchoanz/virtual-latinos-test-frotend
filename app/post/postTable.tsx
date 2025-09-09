import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { usePosts } from "~/context/PostContext";
import { useUser } from "~/context/UserContext";

export function PostTable() {
  const { posts, init, deletePost, showPost } = usePosts();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    init();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleDeleteClick = (id: number) => {
    setPostIdToDelete(id);
    dialogRef.current?.showModal();
  };

  const handleShowClick = async (id: number) => {
    await showPost(id);
    navigate(`/posts/${id}`);
  };

  const handleUpdateClick = async (id: number) => {
    await showPost(id);
    navigate(`/posts/${id}/edit`);
  };

  const handleConfirmDelete = async () => {
    if (postIdToDelete !== null) {
      setLoading(true);
      await deletePost(postIdToDelete);
      setLoading(false);
    }
    dialogRef.current?.close();
  };

  const handleCancelDelete = () => {
    dialogRef.current?.close();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error m-4">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start my-4 ml-4">
        {" "}
        {/* Contenedor para el botón */}
        <a href="/posts/create" className="btn btn-primary">
          Crear Post
        </a>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra table-hover w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Department</th>
                <th>Status</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.department || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${post.status === "active" ? "badge-primary" : "badge-error"}`}
                    >
                      {post.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleShowClick(post.id)}
                      >
                        Show
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleUpdateClick(post.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDeleteClick(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dialog id="my_modal_8" className="modal" ref={dialogRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this post?</p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={handleCancelDelete}
          >
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}
