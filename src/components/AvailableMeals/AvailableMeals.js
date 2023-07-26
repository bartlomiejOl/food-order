import React, { useState, useEffect } from 'react';
import './AvailableMeals.css';
import Card from '../Card/Card';
import MealItem from '../MealItem/MealItem';

function AvailableMeals() {
  const [categorySelected, setCategorySelected] = useState('Burgers');
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSelectedCategory = (category) => {
    setCategorySelected(category);
  };

  useEffect(() => {
    const fetchFood = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://food-app-479ae-default-rtdb.firebaseio.com/${categorySelected.toLowerCase()}.json`
      );
      const responseData = await response.json();
      const loadedFood = [];

      for (const key in responseData) {
        loadedFood.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setFoodData(loadedFood);
      setIsLoading(false);
    };
    fetchFood();
  }, [categorySelected]);

  if (isLoading) {
    return (
      <section className="loadingFoods">
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = foodData.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <div className="category">
          <button
            className={categorySelected === 'Burgers' ? 'active' : ''}
            onClick={() => handleChangeSelectedCategory('Burgers')}
          >
            Burgers
          </button>
          <button
            className={categorySelected === 'Pizzas' ? 'active' : ''}
            onClick={() => handleChangeSelectedCategory('Pizzas')}
          >
            Pizzas
          </button>
          <button
            className={categorySelected === 'Drinks' ? 'active' : ''}
            onClick={() => handleChangeSelectedCategory('Drinks')}
          >
            Drinks
          </button>
          <button
            className={categorySelected === 'Extras' ? 'active' : ''}
            onClick={() => handleChangeSelectedCategory('Extras')}
          >
            Extras
          </button>
        </div>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
