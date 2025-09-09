
import { Login } from "../../auth/login";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return <Login />;
}