const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const searchRecipeByName = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.meals) {
      return [];
    }
    
    const recipes = data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      imageUrl: meal.strMealThumb,
    }));
    
    return recipes;
    
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

const fetchRandomRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    const recipe = data.meals[0];
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    
    return {
      id: recipe.idMeal,
      title: recipe.strMeal,
      imageUrl: recipe.strMealThumb,
      description: recipe.strInstructions,
      ingredients: ingredients,
    };
    
  } catch (error) {
    console.error('Error fetching a random recipe:', error);
    return null;
  }
};

export { searchRecipeByName, fetchRandomRecipe };