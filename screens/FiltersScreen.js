import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
				value={props.state}
				onValueChange={props.onValueChange}
			/>
		</View>
	);
};

const FiltersScreen = props => {
	const { navigation } = props;

	const [isGlutenFree, setGlutenFree] = useState(false);
	const [isLactoseFree, setLactoseFree] = useState(false);
	const [isVegan, setVeganFree] = useState(false);
	const [isVegetarian, setVegetarianFree] = useState(false);

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian
		};
		console.log(appliedFilters);
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

	useEffect(() => {
		navigation.setParams({ save: saveFilters });
	}, [saveFilters]);

	props.navigation.setOptions({
		headerTitle: "Filter Meals",
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
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Save"
					iconName="ios-save"
					onPress={() => {
						props.route.params["save"](); //ho fem per executar el punter
					}}
				/>
			</HeaderButtons>
		)
	});
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch
				label="Gluten-free"
				state={isGlutenFree}
				onValueChange={newValue => setGlutenFree(newValue)}
			/>
			<FilterSwitch
				label="Lactose-free"
				state={isLactoseFree}
				onValueChange={newValue => setLactoseFree(newValue)}
			/>
			<FilterSwitch
				label="Vegan"
				state={isVegan}
				onValueChange={newValue => setVeganFree(newValue)}
			/>
			<FilterSwitch
				label="Vegetarian"
				state={isVegetarian}
				onValueChange={newValue => setVegetarianFree(newValue)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center"
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		margin: 20,
		textAlign: "center"
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		marginVertical: 10
	}
});

export default FiltersScreen;
