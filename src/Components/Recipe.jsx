import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipeById } from "../spoonacular.jsx";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaHome,
  FaSearch,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaCircle,
  FaTimes,
} from "react-icons/fa";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipes")) || []
  );
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  );
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      const data = await fetchRecipeById(id);
      setRecipe(data);
    };
    loadRecipe();
  }, [id]);

  const handleLike = () => {
    const updatedLikes = likedRecipes.includes(Number(id))
      ? likedRecipes.filter((recipeId) => recipeId !== Number(id))
      : [...likedRecipes, Number(id)];
    setLikedRecipes(updatedLikes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
  };

  const handleSave = () => {
    const updatedSaves = savedRecipes.includes(Number(id))
      ? savedRecipes.filter((recipeId) => recipeId !== Number(id))
      : [...savedRecipes, Number(id)];
    setSavedRecipes(updatedSaves);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSaves));
  };

  const toggleStep = (stepNumber) => {
    setCompletedSteps(
      completedSteps.includes(stepNumber)
        ? completedSteps.filter((num) => num !== stepNumber)
        : [...completedSteps, stepNumber]
    );
  };

  const toggleInstructions = () => {
    setIsInstructionsOpen(!isInstructionsOpen);
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <header className="bg-orange-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">{recipe.title}</h1>
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

      <main className="max-w-4xl mx-auto p-6">
        <img
          src={
            recipe.image || "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        {/* Like and Save Buttons */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={handleLike}
            className={`text-2xl ${
              likedRecipes.includes(Number(id))
                ? "text-red-500"
                : "text-gray-400"
            } hover:text-opacity-80`}
          >
            {likedRecipes.includes(Number(id)) ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            onClick={handleSave}
            className={`text-2xl ${
              savedRecipes.includes(Number(id))
                ? "text-green-500"
                : "text-gray-400"
            } hover:text-opacity-80`}
          >
            {savedRecipes.includes(Number(id)) ? (
              <FaBookmark />
            ) : (
              <FaRegBookmark />
            )}
          </button>
        </div>

        {/* Recipe Information Section */}
        <div className="bg-orange-50 rounded-lg p-4 mb-6">
          <p className="text-gray-800 font-semibold">
            {recipe.readyInMinutes} Minutes to prepare
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <FaCircle
              className={recipe.vegetarian ? "text-green-500" : "text-red-500"}
            />
            <span className="text-gray-700">
              {recipe.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
            </span>
            <span className="text-gray-700">• Serves: {recipe.servings}</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <FaTimes
              className={recipe.glutenFree ? "text-green-500" : "text-red-500"}
            />
            <span className="text-gray-700">
              {recipe.glutenFree ? "Gluten-Free" : "Not Gluten-Free"}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <FaTimes
              className={recipe.vegan ? "text-green-500" : "text-red-500"}
            />
            <span className="text-gray-700">
              {recipe.vegan ? "Vegan" : "Not Vegan"}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-500">💰</span>
            <span className="text-gray-700">
              ${(recipe.pricePerServing / 100).toFixed(2)} per serving
            </span>
          </div>
        </div>

        {/* Ingredients Section */}
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Ingredients</h2>
        <div className="bg-orange-50 rounded-lg p-4">
          <ul className="space-y-2">
            {recipe.extendedIngredients &&
              recipe.extendedIngredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-orange-100 transform hover:scale-[1.02] transition-all duration-300"
                >
                  <img
                    src={
                      ingredient.image
                        ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
                        : "https://via.placeholder.com/50?text=No+Image"
                    }
                    alt={ingredient.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-gray-700">{ingredient.original}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Step-by-Step Tutorial Section */}
        <div className="mt-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Instructions
            </h2>
            <button className="text-orange-600 hover:text-orange-800">
              {isInstructionsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Follow these steps to prepare the dish:
          </p>
          {isInstructionsOpen && (
            <div className="bg-orange-50 rounded-lg p-4">
              {recipe.analyzedInstructions &&
              recipe.analyzedInstructions.length > 0 ? (
                <ol className="list-decimal pl-4 space-y-2">
                  {recipe.analyzedInstructions[0].steps.map((step) => (
                    <li
                      key={step.number}
                      className="text-gray-700 flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={completedSteps.includes(step.number)}
                        onChange={() => toggleStep(step.number)}
                        className="form-checkbox h-5 w-5 text-orange-500"
                      />
                      <span
                        className={
                          completedSteps.includes(step.number)
                            ? "line-through text-gray-500"
                            : ""
                        }
                      >
                        {step.step}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600">No instructions available.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Recipe;
