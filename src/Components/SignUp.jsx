import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-50">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Sign Up</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
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
          onClick={() => navigate("/profile")} // Navigate to profile to set preferences
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/home")} // Skip to home
          className="w-full mt-2 text-orange-600 hover:underline"
        >
          No, thanks
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-600 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
