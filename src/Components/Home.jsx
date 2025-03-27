import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../spoonacular.jsx";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaHome,
  FaSearch,
  FaUser,
} from "react-icons/fa";

function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipes")) || []
  );
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  );

  useEffect(() => {
    const loadRecipes = async () => {
      const featuredData = await fetchRecipes("", 6);
      setFeaturedRecipes(featuredData);

      const trendingData = await fetchRecipes("pasta", 3);
      setTrendingRecipes(trendingData);

      const suggestedData = await fetchRecipes("pizza", 3);
      setSuggestedRecipes(suggestedData);
    };
    loadRecipes();
  }, []);

  const handleLike = (recipeId) => {
    const updatedLikes = likedRecipes.includes(recipeId)
      ? likedRecipes.filter((id) => id !== recipeId)
      : [...likedRecipes, recipeId];
    setLikedRecipes(updatedLikes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
  };

  const handleSave = (recipeId) => {
    const updatedSaves = savedRecipes.includes(recipeId)
      ? savedRecipes.filter((id) => id !== recipeId)
      : [...savedRecipes, recipeId];
    setSavedRecipes(updatedSaves);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSaves));
  };

  const RecipeCard = ({ recipe }) => (
    <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={
            recipe.image || "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {recipe.summary
              ? recipe.summary.split(".")[0] + "."
              : "No description available."}
          </p>
          <div className="mt-2 flex space-x-2">
            {recipe.diets &&
              recipe.diets.slice(0, 2).map((diet) => (
                <span
                  key={diet}
                  className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
                >
                  {diet}
                </span>
              ))}
            {recipe.dishTypes &&
              recipe.dishTypes.slice(0, 1).map((type) => (
                <span
                  key={type}
                  className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded"
                >
                  {type}
                </span>
              ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLike(recipe.id);
              }}
              className={`text-2xl ${
                likedRecipes.includes(recipe.id)
                  ? "text-red-500"
                  : "text-gray-400"
              } hover:text-opacity-80`}
            >
              {likedRecipes.includes(recipe.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSave(recipe.id);
              }}
              className={`text-2xl ${
                savedRecipes.includes(recipe.id)
                  ? "text-green-500"
                  : "text-gray-400"
              } hover:text-opacity-80`}
            >
              {savedRecipes.includes(recipe.id) ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </button>
          </div>
          <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
            View Recipe
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <header className="bg-orange-100 p-4 flex justify-between items-center">
        <h1 className="text-4xl font-boldtext-4xl font-bold bg-gradient-to-r from-purple-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          The Amingo Recipe App
        </h1>
        <nav className="space-x-4 flex items-center">
          <Link to="/home" className="text-orange-600 hover:text-orange-800">
            <FaHome className="text-2xl" />
          </Link>
          <Link to="/search" className="text-orange-600 hover:text-orange-800">
            <FaSearch className="text-2xl" />
          </Link>
          <Link to="/profile" className="text-orange-600 hover:text-orange-800">
            <FaUser className="text-2xl" />
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Featured Recipes
        </h2>
        {featuredRecipes.length === 0 ? (
          <p className="text-gray-600">Loading featured recipes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Suggested Recipes
          </h2>
          {suggestedRecipes.length === 0 ? (
            <p className="text-gray-600">Loading suggested recipes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Trending Recipes
          </h2>
          {trendingRecipes.length === 0 ? (
            <p className="text-gray-600">Loading trending recipes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-orange-100 p-4 text-center text-orange-600">
        <p>© 2025 Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
