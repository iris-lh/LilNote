import React from 'react'
import { 
  View,
  StyleSheet, 
  Image,
  Text,
} from 'react-native'

import Header from './Header'
import DrawerButton from './DrawerButton'

const uuid = require('uuid/v1')
import config from '../config'

export default class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/store/lilnote-v1-512.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title='Asdf' style={{backgroundColor: config.colors.secondary}}/>
        <View style={styles.content}>
          <DrawerButton title='Search & Filter' iconSource={config.icons.search}/>
          <DrawerButton title='Color Picker' iconSource={config.icons.paintPalette}/>
          <DrawerButton title='Settings' iconSource={config.icons.settings}/>
          <DrawerButton title='Sign Out' iconSource={config.icons.signOut}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
  },
  content: {
    height: '100%',
    backgroundColor: config.colors.darkGray,
  }
})