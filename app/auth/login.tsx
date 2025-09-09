import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useUser } from "~/context/UserContext";
import type { AuthResponse } from "~/models/response.model";
import { useApi } from "~/hooks/axios";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useUser();
  const { post } = useApi();
  const navigate = useNavigate()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await post<AuthResponse>("auth/login", { email, password });
    if (response.status) {
      const { user, token } = response.data;
      login({ ...user, token });
      navigate('/posts');
    } else {
      setError(
        response.data.message || "Invalid credentials."
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <div className="card-body mx-auto">
          <h2 className="card-title text-center text-3xl font-bold mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className={`btn btn-primary w-full max-w-xs`}
              >
                {isLoading ? "loading ..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
