import { useState, useEffect } from "react";
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

function BrowseRecipes() {
  const [category, setCategory] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipes")) || []
  );
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  );
  const categories = ["Italian", "Desserts", "Vegan"];

  useEffect(() => {
    if (category) {
      const loadRecipes = async () => {
        const data = await fetchRecipes(category);
        setRecipes(data);
      };
      loadRecipes();
    }
  }, [category]);

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

  return (
    <div>
      <header className="bg-orange-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">Browse Recipes</h1>
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

      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-orange-50"
            >
              <h3 className="text-xl font-bold text-gray-800">{cat}</h3>
            </button>
          ))}
        </div>
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={
                      recipe.image ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {recipe.summary
                        ? recipe.summary.split(".")[0] + "."
                        : "No description available."}
                    </p>
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
                        {likedRecipes.includes(recipe.id) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default BrowseRecipes;
