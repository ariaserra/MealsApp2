import React from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { MEALS } from "../data/dummy-data";
import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailScreen = props => {
	const { mealId } = props.route.params;
	const meal = MEALS.find(x => x.id === mealId);
	props.navigation.setOptions({
		headerTitle: meal.title,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Favorite"
					iconName="ios-star"
					onPress={() => console.log("preeess")}
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
