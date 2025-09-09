import ProtectedRoute from "~/portected/protectedRoute";
import { Post } from "../../post/post";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function PostMeta() {
  return <Post />;
}
