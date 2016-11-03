import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';
import HeadBuffer from './HeadBuffer';

const recipeUrl = 'https://mealdotnext4.herokuapp.com/api/recipe/';
const mealUrl = 'https://mealdotnext4.herokuapp.com/api/meal/';

const localRecipeUrl = 'http://10.6.19.49:8000/api/recipe/';
const localMealUrl = 'http://10.6.19.49:8000/api/meal/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
});

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
  }

  getData(searchString) {
    fetch(localRecipeUrl + searchString, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        this.props.updateSearchRecipes(data);
      }
    }).done();
  }

  postMeal(recipeId) {
    fetch(localMealUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.getToken(),
      },
      body: JSON.stringify({
        userId: this.props.getUserId(),
        recipeId,
      }),
    })
    .then(() => {
      this.props.navigator.pop();
    });
  }

  gotoNext(recipe) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        postMeal: this.postMeal,
        text: 'Add',
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay />
        <Searchbar enter={this.getData} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.getSearchRecipes().map((meal, i) => (
            <MealTile
              recipe={meal}
              showInfo={this.gotoNext}
              key={i}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

