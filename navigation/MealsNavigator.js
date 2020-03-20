import React from "react";
import { Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; //npm install --save react-native-gesture-handler@1.4.1 -D -E
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

const defaultStackNavigatorScreenOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
	},
	headerTitleStyle: {
		fontFamily: "open-sans-bold"
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans"
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
	headerTitle: "A title"
};

const MealsStack = createStackNavigator();

const MealsNavigator = props => {
	return (
		<MealsStack.Navigator
			initialRouteName="Categories"
			screenOptions={defaultStackNavigatorScreenOptions}
		>
			<MealsStack.Screen name="Categories" component={CategoriesScreen} />
			<MealsStack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
			<MealsStack.Screen name="MealDetails" component={MealDetailScreen} />
		</MealsStack.Navigator>
	);
};

const FavoritesStack = createStackNavigator();
const FavoritesNavigatior = props => {
	return (
		<FavoritesStack.Navigator
			initialRouteName="Favorites"
			screenOptions={defaultStackNavigatorScreenOptions}
		>
			<FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
			<FavoritesStack.Screen name="MealDetails" component={MealDetailScreen} />
		</FavoritesStack.Navigator>
	);
};

const TabsScreenNavigator = props => {
	const BottomTab =
		// Platform.OS === "android"
		// 	? createMaterialBottomTabNavigator()
		createBottomTabNavigator();
	let tabOptions =
		// Platform.OS === "android"
		// 	? [(activeColor = Colors.accentColor)]
		// 	: //barStyle = { backgroundColor: Colors.primaryColor }
		// 	  // activeColor = { Colors.accentColor }
		// 	  // shifting = { true} )}
		[
			(tabBarOptions = {
				labelStyle: { fontFamily: "open-sans" },
				activeTintColor: Colors.accentColor
			})
		];
	return (
		<BottomTab.Navigator {...tabOptions}>
			<BottomTab.Screen
				name="Meals"
				component={MealsNavigator}
				options={{
					tabBarIcon: tabInfo => {
						return (
							<Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
						);
					},
					tabBarColor: Colors.primaryColor,
					tabBarLabel:
						Platform.OS == "android"
							? () => {
									return <Text style={{ fontFamily: "open-sans" }}>Meals</Text>;
							  }
							: "Meals"
				}}
			/>
			<BottomTab.Screen
				name="Favorites"
				component={FavoritesNavigatior}
				options={{
					tabBarLabel: "Favourites",
					tabBarIcon: tabInfo => {
						return <Ionicons name="ios-star" size={25} color={tabInfo.color} />;
					},
					tabBarLabel:
						Platform.OS == "android"
							? () => {
									return (
										<Text style={{ fontFamily: "open-sans" }}>Favorites</Text>
									);
							  }
							: "Favorites"
				}}
			/>
		</BottomTab.Navigator>
	);
};

const FilterStack = createStackNavigator();
const FilterNavigator = props => {
	return (
		<FilterStack.Navigator screenOptions={defaultStackNavigatorScreenOptions}>
			<FilterStack.Screen name="Filter" component={FiltersScreen} />
		</FilterStack.Navigator>
	);
};

const DrawerNavigator = createDrawerNavigator();

const MainNavigator = props => {
	return (
		<DrawerNavigator.Navigator
			drawerContentOptions={{
				activeTintColor: Colors.accentColor,
				labelStyle: {
					fontFamily: "open-sans-bold"
				}
			}}
		>
			<DrawerNavigator.Screen
				name="MealsFav"
				component={TabsScreenNavigator}
				options={{ drawerLabel: "Meals" }}
			/>
			<DrawerNavigator.Screen name="Filters" component={FilterNavigator} />
		</DrawerNavigator.Navigator>
	);
};

const MealsFavTabNavigator = props => {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	);
};

export default MealsFavTabNavigator;
