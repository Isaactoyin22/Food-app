import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRecipeById } from "../spoonacular.jsx";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";

function Profile() {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const likedIds = JSON.parse(localStorage.getItem("likedRecipes")) || [];
      const savedIds = JSON.parse(localStorage.getItem("savedRecipes")) || [];

      // Fetch details for liked recipes
      const likedPromises = likedIds.map((id) => fetchRecipeById(id));
      const likedResults = await Promise.all(likedPromises);
      setLikedRecipes(likedResults.filter((recipe) => recipe !== null));

      // Fetch details for saved recipes
      const savedPromises = savedIds.map((id) => fetchRecipeById(id));
      const savedResults = await Promise.all(savedPromises);
      setSavedRecipes(savedResults.filter((recipe) => recipe !== null));
    };
    loadRecipes();
  }, []);

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
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
            View Recipe
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <header className="bg-orange-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">Profile</h1>
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
          Your Profile
        </h2>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Dietary Preference
          </h3>
          <select className="p-2 border rounded mt-2">
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Gluten-Free</option>
          </select>
          <button className="ml-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
            Set Preference
          </button>
        </div>

        {/* Liked Recipes Section */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Liked Recipes
          </h3>
          {likedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No liked recipes yet.</p>
          )}
        </div>

        {/* Saved Recipes Section */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Saved Recipes
          </h3>
          {savedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No saved recipes yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
