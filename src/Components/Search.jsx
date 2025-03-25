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

function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipes")) || []
  );
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  );

  const handleSearch = async () => {
    const data = await fetchRecipes(query);
    setRecipes(data);
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

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
        <h1 className="text-2xl font-bold text-orange-600">Search</h1>
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
        <input
          type="text"
          placeholder="Search by category or ingredients..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="flex space-x-4 mb-6">
          <Link to="/browse">
            <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
              Browse by Category
            </button>
          </Link>
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Filter by Ingredients
          </button>
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

export default Search;
