import { Google } from 'expo'
import firebase from 'firebase'
const uuid = require('uuid/v1')
const moment = require('moment')
const _ = require('lodash')
import config from '../config'

firebase.initializeApp(config.firebase)


export default class Cloud {
  static async signInGoogle(callback) {
    // try {
    const result = await Google.logInAsync({
      androidClientId: config.auth.google.androidClientId,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
      
      firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(res => {
        callback(res.user)
      })
      .catch(error => {
        console.log(error)
      });
    } else {
      return {cancelled: true};
    }

    // } catch(e) {
    //   alert(e)
    //   console.log(e)
    // }
  }

  static uploadContent(uid, content) {
    const stampedContent = {
      ...content, 
      id: uuid(), 
      date: new Date().toString(),
      dateNow: Date.now()
    }

    switch(content.type) {
      case 'image':
        return this._uploadImage(uid, stampedContent)
      case 'text':
        return this._uploadText(uid, stampedContent)
      case 'gif':
        return this._uploadGif(uid, stampedContent)
    }
  }

  static _uploadText(uid, content) {
    const ref = 'users/' + uid + '/entries/' + content.id
    return firebase.database().ref(ref).set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'text',
      content: content.text
    })
  }

  static _uploadGif(uid, content) {
    const ref = 'users/' + uid + '/entries/' + content.id
    return firebase.database().ref(ref).set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'gif',
      content: content.url
    })
    .catch(err => {
      console.log(err)
    })
  }

  static async _uploadImage(uid, content) {
    const imageRef = 'users/' + uid + '/images/' + content.id + '.jpg'
    const entryRef = 'users/' + uid + '/entries/' + content.id
    const response = await fetch(content.uri)
    const blob = await response.blob()

    // Upload image to storage
    await firebase.storage().ref(imageRef).put(blob)

    // Get download url
    const url = await firebase.storage().ref(imageRef).getDownloadURL()

    // Update user entry
    return firebase // update user entry
    .database()
    .ref(entryRef)
    .set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'image',
      content: url
    })
    .catch(err => {
      console.log(err)
    })
  }

  static getEntries(uid, callback) {
    const ref = 'users/' + uid + '/entries/'
    return firebase.database().ref(ref).once('value').then(snapshot => {
      const values = _.valuesIn(snapshot.val())
      const sorted = _.sortBy(values, val => parseInt(val.dateNow))
      callback(sorted)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static async deleteEntry(uid, id) {
    // Get entry from database so that we can know its type
    // TODO Do we really need this extra DB call?
    const entryRef = 'users/' + uid + '/entries/' + id
    const snapshot = await firebase.database().ref(entryRef).once('value')
    const entry = snapshot.val()

    // Delete image from storage
    if (entry.type === 'image') {
      const imageRef = 'users/' + uid + '/images/' + id + '.jpg'
      firebase.storage().ref(imageRef).delete()
    }

    // Delete entry from database
    return firebase.database().ref(entryRef).remove()
    .catch(err => {
      console.log(err)
    })
  }
}