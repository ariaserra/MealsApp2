import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CATEGORIES } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = props => {
	props.navigation.setOptions({
		headerTitle: "Meals Categories",
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
	const renderGridItem = itemData => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onSelect={() => {
					props.navigation.navigate("CategoryMeals", {
						categoryId: itemData.item.id
					});
				}}
			/>
		);
	};

	return (
		<FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "blue"
	}
});

export default CategoriesScreen;
