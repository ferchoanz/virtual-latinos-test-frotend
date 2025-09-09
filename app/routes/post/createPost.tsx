import ProtectedRoute from "~/portected/protectedRoute";
import { CreatePost } from "~/post/createPost";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return <CreatePost />;
}
