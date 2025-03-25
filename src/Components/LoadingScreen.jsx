import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/signup");
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-orange-100">
      <h1 className="text-4xl font-bold text-orange-600 animate-pulse">
        Loading...
      </h1>
    </div>
  );
}

export default LoadingScreen;
