import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Header from './Header';
import { Container, Content, List, ListItem, Thumbnail, Title, Text } from 'native-base';
import utils from '../Utils/utils';
import Column from './Column';

const width = Dimensions.get('window').width;


const StandardizeInfo = (text) => {
  // console.log('Standardize:', text, typeof text);
  if (text) {
    const Standardized = text.toString().replace('nf_', '').replace('_', ' ')
    .replace('_', ' ').replace('_', ' ');
    return Standardized[0].toUpperCase() + Standardized.slice(1);
  }
};

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props, 'props from pick MenuItem');
  }

  render() {
    // console.log('Nutrition info in MenuItem:', this.props.item);
    const NutritionInfo = JSON.parse(this.props.item.nutritionalInfo);
    console.log('Full NutritionInfo:', NutritionInfo);
    return (
      <View style={styles.container}>
        <Header title={'Meal.info'}/>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >



          <Title>{this.props.item.restaurantName}</Title>

          <Title>{this.props.item.name}</Title>
          {Object.keys(NutritionInfo).map((key) => {
            if (key.toString().indexOf('_id') === -1 && key.toString().indexOf('updated') === -1 && key.toString().indexOf('item') === -1 && key.toString().indexOf('brand') === -1 && NutritionInfo[key]) {
              const standardizedKey = StandardizeInfo(key);
              console.log('Z', standardizedKey, NutritionInfo[key]);
              return (
                <ListItem style={styles2.table} key={key} >
                    <Text  style={styles2.text} >{standardizedKey}: {NutritionInfo[key]}</Text>
                </ListItem>
                )
            } else {
              return null;
            }
          })}


        </ScrollView>

      </View>
    );
  }
}

export default MenuItem;

/*

<Column
  data='QtyData'//{compileNutrition(props.recipe.digest)}
  name="Qty"
  index="totalUnit"
  alignRight
/>
<Column
  data='dailyPercentData'//{compileNutrition(props.recipe.digest)}
  name="Daily"
  index="dailyPercent"
  alignRight
/>

<List>
  <Title>{this.props.item.restaurantName}</Title>
  <Title>{this.props.item.name}</Title>
  {Object.keys(NutritionInfo).map((key) => (
    <ListItem key={key} >
        <Text>{key}: {NutritionInfo[key]}</Text>
    </ListItem>
  ))}
</List> 

*/


/************************ STYLES *************************/

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'stretch',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
  icon: {
    position: 'absolute',
    top: 100,
    right: 25
  }
});

/************************ STYLES *************************/

const styles2 = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  picture: {
    width: width * 0.9,
    height: 250,
    opacity: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  click: { fontSize: 30 },
  table: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  scroller: {
    marginBottom: 50,
  },
  text: {
    fontFamily: 'Futura',
  },
});