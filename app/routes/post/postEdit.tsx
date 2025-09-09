import ProtectedRoute from "~/portected/protectedRoute";
import { PostEdit } from "~/post/postEdit";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return <PostEdit />;
}
