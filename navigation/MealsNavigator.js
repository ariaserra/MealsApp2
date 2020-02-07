import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';//npm install --save react-native-gesture-handler@1.4.1 -D -E

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

 const Stack = createStackNavigator();

const MealsNavigator = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Categories" component={CategoriesScreen} />
                <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
                <Stack.Screen name="MealDetails" component={MealDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MealsNavigator;