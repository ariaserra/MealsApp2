import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoriyMealsScreen = props => {
	const { categoryId } = props.route.params;

	const availableMeals = useSelector(state => state.meals.filteredMeals);

	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(categoryId) >= 0
	);

	props.navigation.setOptions({
		headerTitle: CATEGORIES.find(x => x.id === categoryId).title
	});

	if (!displayedMeals || displayedMeals.length === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No meals found, maybe check your filters?</DefaultText>
			</View>
		);
	}

	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default CategoriyMealsScreen;
