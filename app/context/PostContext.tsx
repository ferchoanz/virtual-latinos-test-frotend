import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { PostModel } from "~/models/post.model";
import type { ResponseModel } from "~/models/response.model";
import { useApi } from "~/hooks/axios";
import { useUser } from "./UserContext";
import type { Applicant } from "~/models/applicant.model";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

interface PostsContextType {
  posts: PostModel[];
  currentPost: PostModel | null;
  currentApplicants: Applicant[];
  init: () => Promise<void>;
  addPost: (newPost: Partial<PostModel>) => Promise<void>;
  showPost: (id: number) => Promise<void>;
  updatePost: (id: number, updatedPost: Partial<PostModel>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  loadApplicants: (id: number) => Promise<void>;
}

export const PostsContext = createContext<PostsContextType | null>(null);

interface PostsProviderProps {
  children: ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [currentPost, setCurrentPost] = useState<PostModel | null>(null);
  const [currentApplicants, setCurrentApplicants] = useState<Applicant[]>([]);
  const [hasError, setHasError] = useState(false);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const { get, post, put, del } = useApi();

  const init = async () => {
    if (!user && !loading) {
      return;
    }
    const response = await get<PostModel[]>("posts");
    if (response.status) {
      setPosts(response.data);
    } else {
      Swal.fire({
        title: "Error!",
        text: (response.data as unknown as any)?.message as string,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const addPost = async (newPost: Partial<PostModel>) => {
    if (!user) {
      return;
    }
    const response = await post<PostModel>("posts", newPost);
    if (response.status) {
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      navigate("/posts");
    } else {
      Swal.fire({
        title: "Error!",
        text: (response.data as unknown as any)?.message as string,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const updatePost = async (id: number, updatedPost: Partial<PostModel>) => {
    if (!user) {
      return;
    }
    const response = await put<PostModel>(`posts/${id}`, updatedPost);
    if (response.status) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, ...response.data } : post
        )
      );
      navigate("/posts");
    } else {
      Swal.fire({
        title: "Error!",
        text: (response.data as unknown as any)?.message as string,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const deletePost = async (id: number) => {
    if (!user) {
      return;
    }
    const response = await del(`posts/${id}`);
    if (response.status) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } else {
      Swal.fire({
        title: "Error!",
        text: (response.data as unknown as any)?.message as string,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const showPost = async (id: number) => {
    if (!user) {
      return;
    }

    const findPost = posts.find((item) => item.id == id);
    if (findPost) {
      setCurrentPost(findPost);
      return;
    }

    const response = await get<PostModel>(`posts/${id}`);
    if (response.status) {
      setCurrentPost(response.data);
    } else {
      Swal.fire({
        title: "Error!",
        text: (response.data as unknown as any)?.message as string,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const loadApplicants = async (id: number) => {
    if (!user) {
      return;
    }

    const response = await get<Applicant[]>(`posts/${id}/applicants`);

    if (response.status) {
      setCurrentApplicants(response.data);
    } else {
      Swal.fire({
        title: "Error!",
        text: (response.data as unknown as any)?.message as string,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const value = {
    posts,
    currentPost,
    currentApplicants,
    hasError,
    init,
    addPost,
    showPost,
    updatePost,
    deletePost,
    loadApplicants,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === null) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
