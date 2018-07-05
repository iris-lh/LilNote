import React from 'react'
import { 
  StyleSheet,
  View, 
  Vibration,
} from 'react-native'

import { ImagePicker, ImageManipulator, Permissions } from 'expo'

const _ = require('lodash')

const uuid = require('uuid/v1')

import Header from '../components/Header'
import ContentView from '../components/ContentView'
import Footer from '../components/Footer'

import config from '../config'
import { Database } from '../helpers'


export default class MainScreen extends React.Component {
 constructor() {
   super()
    this.state = {
      entryArray: [
      ],
      textInputValue: ''
    }
  }

  componentWillMount() {
    this.getEntries()
  }

  getEntries() {
    return Database.getEntries(config.user, entries => {
      this.setState({entryArray: entries})
      this.forceUpdate()
    })
  }

  async onSubmitText() {
    Database.uploadContent({
      user: config.user, // auth stuff here?
      type: 'text',
      text: this.state.textInputValue
    })
    .then(res => {
      this.getEntries()
    })
    .then(res => {
      setTimeout(()=>{
        this.scrollToEnd()
      }, 100)
    })
    this.setState({ textInputValue: '' })
  }

  async onPressPicture() {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const image = await ImagePicker.launchCameraAsync()
    const processed = await ImageManipulator.manipulate(image.uri, [{resize: {width: 300}}])
    Database.uploadContent({
      user: config.user, // auth stuff here?
      type: 'image',
      uri: processed.uri
    })
    .then(res => {
      // alert('uploaded picture')
      this.getEntries()
    })
    .then(res => {
      setTimeout(()=>{
        this.scrollToEnd()
      }, 100)
    })
  }

  async onPressGif() {
    Database.uploadContent({
      user: config.user, // auth stuff here?
      type: 'gif',
      url: 'https://i.giphy.com/media/11HkufsiNrBXK8/giphy.webp'
    })
    .then(res => {
      this.getEntries()
    })
    .then(res => {
      setTimeout(()=>{
        this.scrollToEnd()
      }, 100)
    })
  }

  // addEntry() {
  //   if (this.state.textInputValue) {
  //     const old = this.state.entryArray
  //     const id = uuid()
  //     const date = new Date()
  //     const text = this.state.textInputValue
  //     const entry = {id, date, text}
  //     this.setState({ entryArray: [...old, entry] })
  //     this.setState({ textInputValue: '' })
  //     Database.addContent(entry)
  //   }
  // }

  deleteEntry(id) {
    Vibration.cancel()
    Vibration.vibrate()
    const newArray = this.state.entryArray.filter(entry => {
      return entry.id !== id
    })
    
    // this.setState({entryArray: newArray})

    Database.deleteEntry(config.user, id)
    .then(res => {
      this.getEntries()
    })
  }

  updateTextInputValue(text) {
    this.setState({textInputValue: text})
  }

  scrollToEnd() {
    this.contentView.scrollToEnd()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title='Notes'/>

        <ContentView 
          ref={ref => this.contentView = ref}
          entryArray={this.state.entryArray} 
          deleteEntry={this.deleteEntry.bind(this)}
        />

        <Footer
          navigation={this.props.navigation}
          onChangeText={this.updateTextInputValue.bind(this)}
          onSubmitText={this.onSubmitText.bind(this)}
          value={this.state.textInputValue}
          onSubmitText={this.onSubmitText.bind(this)}
          onPressPicture={this.onPressPicture.bind(this)}
          onPressGif={this.onPressGif.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background
  },
});
