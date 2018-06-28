import React from 'react'
import { 
  View,
  StyleSheet, 
  TouchableHighlight,
  Image,
  Text,
} from 'react-native'

import config from '../config'

export default class DrawerButton extends React.Component {
  render() {
    return (
        <TouchableHighlight style={styles.button} underlayColor={config.colors.primary} onPress={function(){}}>
          <View style={styles.buttonInternal}>
            <Image style={styles.buttonIcon} source={this.props.iconSource}/>
            <Text style={styles.buttonText}> {this.props.title} </Text>
          </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: config.colors.darkGray,
    
    paddingBottom: 5,
    // borderTopWidth: 2,
    // borderTopColor: '#666',
    width: '100%',
    elevation: 5,

  },
  buttonInternal: {
    width: '100%',
    padding: 20,
    // paddingLeft: 50,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly'
  },
  buttonIcon: {
    
    width: 24,
    height: 24,
    tintColor: config.colors.grayedOut
  },
  buttonText: {
    paddingLeft: 30,
    color: config.colors.grayedOut,
  }
})