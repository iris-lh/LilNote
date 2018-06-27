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
}

const styles = StyleSheet.create({
  message: {
    height: Dimensions.get('window').height - config.textInputHeight,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  line1: {
    ...textStyle,
    marginTop: 70,
    flex: 1,
  },
  line2: {
    ...textStyle,
    marginTop: 50,
    flex: 1,
  },
  arrow: {
    tintColor: config.colors.emptyPageText,
    marginBottom: 200,
  }
})