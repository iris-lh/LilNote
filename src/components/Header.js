import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Platform,
} from 'react-native';

import config from '../config'


export default class Header extends React.Component {
  constructor(props) {
    super(props)
    // this.styles = {...{backgroundColor: 'pink'}, ...styles.header}
  }

  getStyles() {
    return {backgroundColor: 'pink', ...styles}
  }

  render() {
    const headerStyle = StyleSheet.flatten([styles.header, this.props.style]);
    return (
      <View>
        <StatusBar
            barStyle="light-content"
            translucent={false}
            backgroundColor="rgba(0, 0, 0, 1)"
          />
          
        <View style ={headerStyle}>
          <Text style={styles.headerText}> {this.props.title} </Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      android: {
        borderTopWidth: StatusBar.currentHeight,
        borderTopColor: 'black',
      },
    }),
    // TODO: Figure out a more flexible way to handle the statusbar on android
    height: 80,
    elevation: 10,
    zIndex: 100,
    backgroundColor: config.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 0,

  },
  headerText: {
    ...Platform.select({
      ios: {
        marginTop: 45,
      },
      android: {
        marginTop: 45 - StatusBar.currentHeight,
      },
    }),
    color: 'white',
    fontSize: 18,
    marginBottom: 25,
  }
})