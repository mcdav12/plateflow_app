export const fetchRandomRecipe = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      const meal = data.meals[0];
  
      // Map the API data to our recipe structure
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
      }
  
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        imageUrl: meal.strMealThumb,
        description: meal.strInstructions.substring(0, 200) + '...', // Truncate description for brevity
        ingredients: ingredients,
      };
  
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }
  };