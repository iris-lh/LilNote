import React from 'react';
import { 
  View,
  TouchableOpacity,
  Image,
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
} from 'react-native';

import GifScroller from './GifScroller'

import config from '../config'

export default class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      inputMode: '',
      gifSearch: ''
    }
  }

  renderInput = () => {
    if (this.state.inputMode === 'text') {
      return (
        <TextInput 
          autoFocus={true}
          blurOnSubmit={true}
          onBlur={()=>{this.setState({inputMode: ''})}}
          keyBoardAppearance={'dark'}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitText}
          value={this.props.value}
          placeholder='New Note'
          placeholderTextColor={config.colors.grayedOut}
          underlineColorAndroid='transparent'
          style={styles.textInput}>
        </TextInput>
      )
    } else if (this.state.inputMode === 'gif') {
      return (
        <View>
          <GifScroller
            inputText={this.state.gifSearch}
            handleGifSelect={this.onSelectGif}
            style={{}}/>
          <TextInput
            ref={ref => this.gifSearchBar = ref}
            autoFocus={true}
            blurOnSubmit={true}
            returnKeyType='done'
            onBlur={()=>{
              this.setState({inputMode: ''})
              this.setState({gifSearch: ''})
            }}
            keyBoardAppearance={'dark'}
            onChangeText={this.onChangeGifSearch}
            value={this.state.gifSearch}
            placeholder='Search Gifs'
            placeholderTextColor={config.colors.grayedOut}
            underlineColorAndroid='transparent'
            style={styles.textInput}>
          </TextInput>
        </View>
      )
    } else {
      return this.renderButtons()
    }
  }

  onChangeGifSearch = (value) => {
    this.setState({gifSearch: value})
    this.forceUpdate()
  }

  onSelectGif = (gif) => {
    this.props.onSelectGif(gif)
    this.gifSearchBar.blur()
  }

  onPressText = () => {
    this.setState({inputMode: 'text'})
  }

  onPressGif = () => {
    this.setState({inputMode: 'gif'})
  }

  renderButtons = () => {
    return (
      <View style={styles.addContentButtonContainer}>
        {/* Write */}
        {/* Should focus the text input */}
        <TouchableOpacity style={styles.addContentButton} onPress={this.onPressText}>
          <Image style={styles.addContentIcon} source={config.icons.text}/>
        </TouchableOpacity>

        {/* Doodle */}
        {/* <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Doodles coming soon!')}>
          <Image style={styles.addContentIcon} source={config.icons.draw}/>
        </TouchableOpacity> */}

        {/* Take/Upload a picture */}
        <TouchableOpacity style={styles.addContentButton} onPress={this.props.onPressPicture}>
          <Image style={styles.addContentIcon} source={config.icons.photo}/>
        </TouchableOpacity>

        {/* Embed a gif */}
        <TouchableOpacity style={styles.addContentButton} onPress={this.onPressGif}>
          <Image style={styles.addContentIcon} source={config.icons.gif}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.footer} behavior="padding">
        
        {this.renderInput()}
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100
  },
  textInput: {
    fontSize: 18,
    height: config.textInputHeight,
    alignSelf: 'stretch',
    color: 'white',
    padding: 20,
    backgroundColor: config.colors.secondary,
    elevation: 7,
  },
  addContentButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  addContentButton: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: config.colors.primary,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 0,

    elevation: 5,
  },
  addContentIcon: {
    tintColor: 'white',
    width: 40,
    height: 40
  }
});