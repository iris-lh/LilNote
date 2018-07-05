import firebase from 'firebase'
const uuid = require('uuid/v1')
const moment = require('moment')
const _ = require('lodash')
import config from '../config'

firebase.initializeApp(config.firebase)

export default class Cloud {
  static uploadContent(content) {
    const stampedContent = {
      ...content, 
      id: uuid(), 
      date: new Date().toString(),
      dateNow: Date.now()
    }

    switch(content.type) {
      case 'image':
        return this._uploadImage(stampedContent)
      case 'text':
        return this._uploadText(stampedContent)
      case 'gif':
        return this._uploadGif(stampedContent)
    }
  }

  static _uploadText(content) {
    const ref = 'users/' + content.user + '/entries/' + content.id
    return firebase.database().ref(ref).set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'text',
      content: content.text
    })
  }

  static _uploadGif(content) {
    const ref = 'users/' + content.user + '/entries/' + content.id
    return firebase.database().ref(ref).set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'gif',
      content: content.url
    })
  }

  static async _uploadImage(content) {
    const imageRef = 'images/'+content.id+'.jpg'
    const entryRef = 'users/' + content.user + '/entries/' + content.id
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
  }

  static getEntries(user, callback) {
    const ref = 'users/' + user + '/entries/'
    return firebase.database().ref(ref).once('value').then(snapshot => {
      const values = _.valuesIn(snapshot.val())
      const sorted = _.sortBy(values, val => parseInt(val.dateNow))
      callback(sorted)
    })
  }

  static async deleteEntry(user, id) {
    // Get entry from database so that we can know its type
    // TODO Do we really need this extra DB call?
    const entryRef = 'users/' + user + '/entries/' + id
    const snapshot = await firebase.database().ref(entryRef).once('value')
    const entry = snapshot.val()

    // Delete image from storage
    if (entry.type === 'image') {
      const imageRef = 'images/' + id + '.jpg'
      firebase.storage().ref(imageRef).delete()
    }

    // Delete entry from database
    return firebase.database().ref(entryRef).remove()
  }
}