import React, { useCallback } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailScreen = props => {
	const { mealId } = props.route.params;
	const availableMeals = useSelector(state => state.meals.meals);
	const currentMealIsFavorite = useSelector(state =>
		state.meals.favoriteMeals.some(meal => meal.id === mealId)
	);
	const meal = availableMeals.find(x => x.id === mealId);

	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	props.navigation.setOptions({
		headerTitle: meal.title,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Favorite"
					iconName={currentMealIsFavorite ? "ios-star" : "ios-star-outline"}
					onPress={() => toggleFavoriteHandler()}
				/>
			</HeaderButtons>
		)
	});
	return (
		<ScrollView>
			<Image source={{ uri: meal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{meal.duration}m</DefaultText>
				<DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{meal.ingredients.map(ingredient => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{meal.steps.map(step => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "center"
	},
	details: {
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-around"
	},
	image: {
		width: "100%",
		height: 200
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 10
	}
});

export default MealDetailScreen;
