import React from 'react'
import { 
  StyleSheet,
  View, 
  Vibration,
} from 'react-native'

import Expo, { ImagePicker, ImageManipulator, Permissions } from 'expo'

const _ = require('lodash')

const uuid = require('uuid/v1')

import Header from '../components/Header'
import ContentView from '../components/ContentView'
import Footer from '../components/Footer'

import config from '../config'
import { Cloud } from '../helpers'


export default class MainScreen extends React.Component {
 constructor() {
    super()
    this.state = {
      user: {},
      entryArray: [
      ],
      inputMode: '',
      textEntryValue: '',
      gifSearchValue: ''
    }
  }

  componentWillMount = () => {
    Cloud.signInGoogle(user => {
      this.setState({user: user})
      this.getEntries()
    })
  }


  getEntries() {
    return Cloud.getEntries(this.state.user.uid, entries => {
      this.setState({entryArray: entries})
      this.forceUpdate()
    })
  }

  updateInputMode(mode) {
    this.setState({inputMode: mode})
  }

  async onSubmitTextEntry() {
    Cloud.uploadContent(this.state.user.uid, {
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
    this.updateTextEntryValue('')
  }

  async onPressPicture() {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const image = await ImagePicker.launchCameraAsync()
    const processed = await ImageManipulator.manipulate(image.uri, [{resize: {width: 300}}])
    Cloud.uploadContent(this.state.user.uid, {
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
    Cloud.uploadContent(this.state.user.uid, {
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
    this.updateInputMode('')
  }

  onBlurGifSearchInput = () => {
    this.updateInputMode('')
    this.updateGifSearchValue('')
  }

  deleteEntry(id) {
    Vibration.cancel()
    Vibration.vibrate()

    const newArray = this.state.entryArray.filter(entry => {
      return entry.id !== id
    })
    
    Cloud.deleteEntry(this.state.user.uid, id)
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

  onChangeDoodle = async (sketch, dimensions) => {
    const options = {
      format: 'png', /// PNG because the view has a clear background
      quality: 0.1, /// Low quality works because it's just a line
      result: 'file',
      height: 300,
      width: 300
    };
    /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
    const uri = await Expo.takeSnapshotAsync(sketch, options);
  };

  onSubmitDoodle = async (uri) => {
    Cloud.uploadContent(this.state.user.uid, {
      type: 'image',
      uri: uri
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
          onChangeDoodle={this.onChangeDoodle.bind(this)}
          onSubmitTextEntry={this.onSubmitTextEntry.bind(this)}
          onSelectGif={this.onSelectGif.bind(this)}
          onSubmitDoodle={this.onSubmitDoodle.bind(this)}
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
