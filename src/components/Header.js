import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar
} from 'react-native';

import config from '../config'


export default class Header extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
            backgroundColor={config.colors.primary}
            barStyle="light-content"
          />
          
        <View style ={styles.header}>
          <Text style={styles.headerText}> Notes </Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    zIndex: 100,
    backgroundColor: config.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 0,

    elevation: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  }
})