import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoriyMealsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The categories meals screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default CategoriyMealsScreen;