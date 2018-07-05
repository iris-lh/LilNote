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
      inputMode: '',
      textEntryValue: '',
      gifSearchValue: ''
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

  updateInputMode(mode) {
    this.setState({inputMode: mode})
  }

  async onSubmitTextEntry() {
    Database.uploadContent({
      user: config.user, // auth stuff here?
      type: 'text',
      text: this.state.textEntryValue
    })
    .then(res => {
      this.getEntries()
    })
    .then(res => {
      setTimeout(()=>{
        this.scrollToEnd()
      }, 100)
    })
    this.setState({ textEntryValue: '' })
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
      this.getEntries()
    })
    .then(res => {
      setTimeout(()=>{
        this.scrollToEnd()
      }, 100)
    })
  }

  async onSelectGif(url) {
    Database.uploadContent({
      user: config.user, // auth stuff here?
      type: 'gif',
      url: url
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

  onBlurTextEntryInput = () => {
    this.setState({inputMode: ''})
  }

  onBlurGifSearchInput = () => {
    this.setState({inputMode: ''}) 
    this.setState({gifSearchValue: ''})
  }

  deleteEntry(id) {
    Vibration.cancel()
    Vibration.vibrate()

    // TODO is this part necessary anymore?
    const newArray = this.state.entryArray.filter(entry => {
      return entry.id !== id
    })
    
    Database.deleteEntry(config.user, id)
    .then(res => {
      this.getEntries()
    })
  }

  updateTextEntryValue(text) {
    this.setState({textEntryValue: text})
  }

  updateGifSearchValue(text) {
    this.setState({gifSearchValue: text})
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
          inputMode={this.state.inputMode}
          updateInputMode={this.updateInputMode.bind(this)}
          navigation={this.props.navigation}
          textEntryValue={this.state.textEntryValue}
          gifSearchValue={this.state.gifSearchValue}
          onChangeTextEntryValue={this.updateTextEntryValue.bind(this)}
          onChangeGifSearchValue={this.updateGifSearchValue.bind(this)}
          onSubmitTextEntry={this.onSubmitTextEntry.bind(this)}
          onSelectGif={this.onSelectGif.bind(this)}
          onBlurTextEntryInput={this.onBlurTextEntryInput.bind(this)}
          onBlurGifSearchInput={this.onBlurGifSearchInput.bind(this)}
          onPressPicture={this.onPressPicture.bind(this)}
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
