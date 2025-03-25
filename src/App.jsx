import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./Components/LoadingScreen";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import Recipe from "./Components/Recipe";
import BrowseRecipes from "./Components/BrowseRecipes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/browse" element={<BrowseRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
