import React from 'react';
import { 
  View,
  TouchableOpacity,
  Image,
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
} from 'react-native';

import { ImagePicker, Permissions } from 'expo'

import firebase from 'firebase'

import config from '../config'

firebase.initializeApp(config.firebase)

const storage = firebase.storage()



export default class Footer extends React.Component {


  async onPressPicture() {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
    .then(res => {
      ImagePicker.launchCameraAsync({base64: true})
      .then(async res => {
        const storageRef = storage.ref()
        const imagesRef = storageRef.child('images')
        const photoRef = imagesRef.child('photo.jpg')
        const response = await fetch(res.uri)
        const blob = await response.blob()

        photoRef.put(blob)
        .then(snapshot => {
          console.log('uploaded!')
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

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
          <TouchableOpacity style={styles.addContentButton} onPress={this.onPressPicture}>
            <Image style={styles.addContentIcon} source={config.icons.photo}/>
          </TouchableOpacity>

          {/* Embed a gif */}
          <TouchableOpacity style={styles.addContentButton} onPress={()=>alert('Gifs coming soon!')}>
            <Image style={styles.addContentIcon} source={config.icons.gif}/>
          </TouchableOpacity>
        </View>
        {/* <TextInput 
          blurOnSubmit={true}
          keyBoardAppearance={'dark'}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
          value={this.props.value}
          placeholder='New Note'
          placeholderTextColor={config.colors.grayedOut}
          underlineColorAndroid='transparent'
          style={styles.textInput}>
        </TextInput> */}
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