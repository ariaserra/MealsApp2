import React from "react";
import { StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MealList from "../components/MealList";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import { View } from "react-native";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = props => {
	props.navigation.setOptions({
		headerTitle: "Your Favorites",
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						props.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	});
	const favMeals = useSelector(state => state.meals.favoriteMeals);
	if (!favMeals || favMeals.length === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No favorite meals found. Start adding some!</DefaultText>
			</View>
		);
	}
	return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default FavoritesScreen;
