import React from 'react';
import { 
  View,
  TouchableOpacity,
  Image,
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
} from 'react-native';

import config from '../config'


export default class Footer extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.footer} behavior="padding">
        <View style={styles.addContentButtonContainer}>

          {/* Write */}
          {/* Should focus the text input */}
          <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Text button coming soon!')}>
            <Image style={styles.addContentIcon} source={config.icons.text}/>
          </TouchableOpacity>

          {/* Doodle */}
          <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Doodles coming soon!')}>
            <Image style={styles.addContentIcon} source={config.icons.draw}/>
          </TouchableOpacity>

          {/* Take/Upload a picture */}
          <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Photos coming soon!')}>
            <Image style={styles.addContentIcon} source={config.icons.photo}/>
          </TouchableOpacity>

          {/* Record/Upload a video */}
          <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Videos coming soon!')}>
            <Image style={styles.addContentIcon} source={config.icons.video}/>
          </TouchableOpacity>

          {/* Embed a gif */}
          <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Gifs coming soon!')}>
            <Image style={styles.addContentIcon} source={config.icons.gif}/>
          </TouchableOpacity>
        </View>
        <TextInput 
          blurOnSubmit={true}
          keyBoardAppearance={'dark'}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
          value={this.props.value}
          placeholder='New Note'
          placeholderTextColor={config.colors.grayedOut}
          underlineColorAndroid='transparent'
          style={styles.textInput}>
        </TextInput>
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
    shadowRadius: 0
  },
  addContentIcon: {
    tintColor: 'white',
    // padding: 20,
    width: 40,
    height: 40
  }
});