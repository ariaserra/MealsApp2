import React from "react";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoriyMealsScreen = props => {
	const { categoryId } = props.route.params;
	const displayedMeals = MEALS.filter(
		meal => meal.categoryIds.indexOf(categoryId) >= 0
	);

	props.navigation.setOptions({
		headerTitle: CATEGORIES.find(x => x.id === categoryId).title
	});
	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

export default CategoriyMealsScreen;
