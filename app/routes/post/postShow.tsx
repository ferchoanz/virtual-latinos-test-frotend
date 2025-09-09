import ProtectedRoute from "~/portected/protectedRoute";
import { PostShow } from "~/post/postShow";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return <PostShow />;
}
