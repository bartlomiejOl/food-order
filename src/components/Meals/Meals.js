import React from 'react';
import './Meals.css';
import MealsSummary from '../MealsSummary/MealsSummary';
import AvailableMeals from '../AvailableMeals/AvailableMeals';

function Meals() {
  return (
    <>
      <MealsSummary></MealsSummary>
      <AvailableMeals></AvailableMeals>
    </>
  );
}

export default Meals;
