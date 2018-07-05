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
import Doodle from './Doodle'

import config from '../config'

export default class Footer extends React.Component {
  renderInput = () => {
    if (this.props.inputMode === 'text') {
      return (
        <TextInput 
          autoFocus={true}
          blurOnSubmit={true}
          onBlur={this.props.onBlurTextEntryInput} // TODO extract to parent
          keyBoardAppearance={'dark'}
          onChangeText={this.props.onChangeTextEntryValue}
          onSubmitEditing={this.props.onSubmitTextEntry}
          value={this.props.textEntryValue}
          placeholder='New Note'
          placeholderTextColor={config.colors.grayedOut}
          underlineColorAndroid='transparent'
          style={styles.textInput}>
        </TextInput>
      )
    } else if (this.props.inputMode === 'gif') {
      return (
        <View>
          <GifScroller
            inputText={this.props.gifSearchValue}
            handleGifSelect={this.onSelectGif}
            style={{}}/>
          <TextInput
            ref={ref => this.gifSearchBar = ref}
            autoFocus={true}
            blurOnSubmit={true}
            returnKeyType='done'
            onBlur={this.props.onBlurGifSearchInput}
            keyBoardAppearance={'dark'}
            onChangeText={this.props.onChangeGifSearchValue}
            value={this.props.gifSearchValue}
            placeholder='Search Gifs'
            placeholderTextColor={config.colors.grayedOut}
            underlineColorAndroid='transparent'
            style={styles.textInput}>
          </TextInput>
        </View>
      )
    } else if (this.props.inputMode === 'doodle') {
      return (
        <Doodle
          style={styles.doodle}
          ref={ref => this.doodle = ref}
          updateInputMode={this.props.updateInputMode}
          onSubmitDoodle={this.props.onSubmitDoodle}/>
      )
    } else {
      return this.renderButtons()
    }
  }


  onSelectGif = (gif) => {
    this.props.onSelectGif(gif)
    this.gifSearchBar.blur()
  }

  onPressText = () => {
    this.props.updateInputMode('text')
  }

  onPressGif = () => {
    this.props.updateInputMode('gif')
  }

  onPressDoodle = () => {
    this.props.updateInputMode('doodle')
  }

  onChangeDoodle = (dimensions) => {
    this.props.onChangeDoodle(this.sketch, dimensions)
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
        <TouchableOpacity style={styles.addContentButton} onPress={this.onPressDoodle}>
          <Image style={styles.addContentIcon} source={config.icons.draw}/>
        </TouchableOpacity>

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