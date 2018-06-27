import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

import config from '../config'

export default class EmptyPage extends React.Component {
  render() {
    return (
        <View style={styles.message}>
          <Text style={styles.line1}>It's awful lonely in here!</Text>
          <Text style={styles.line2}>Why not make a lil' note?</Text>
          {/* TODO get a higher resolution arrow icon */}
          <Image style={styles.arrow} source={config.icons.downArrow}/>
        </View>
    )
  }
}

const textStyle = {
  color: config.colors.emptyPageText,
  fontSize: 30,
  // shadowColor: 'black',
  // shadowOffset: {width: 5, height: 10},
  // shadowOpacity: 0.2,
  // shadowRadius: 10
}

const styles = StyleSheet.create({
  container: {
    top: Dimensions.get('window').height - (Dimensions.get('window').height / 1.5) - 20,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line1: {
    ...textStyle,
    // padding: 20,
    top: -120
  },
  line2: {
    ...textStyle,
    top: 20,
  },
  arrow: {
    tintColor: config.colors.emptyPageText,
    top: 70,
  }
})