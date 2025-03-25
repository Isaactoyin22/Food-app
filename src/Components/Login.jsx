import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-50">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Log In</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Log In
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-orange-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
