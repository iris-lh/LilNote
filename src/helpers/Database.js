import firebase from 'firebase'
const uuid = require('uuid/v1')
const moment = require('moment')
const _ = require('lodash')
import config from '../config'

firebase.initializeApp(config.firebase)

export default class Database {
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
    return firebase
    .database()
    .ref('users/' + content.user + '/entries/' + content.id)
    .set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'text',
      content: content.text
    })
  }

  static _uploadGif(content) {
    return firebase
    .database()
    .ref('users/' + content.user + '/entries/' + content.id)
    .set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'gif',
      content: content.url
    })
  }

  static async _uploadImage(content) {
    const response = await fetch(content.uri)
    const blob = await response.blob()
    await firebase.storage().ref().child('images').child(content.id+'.jpg').put(blob)
    const url = await firebase.storage().ref('images/'+content.id+'.jpg').getDownloadURL()
    return firebase // update user entry
    .database()
    .ref('users/' + content.user + '/entries/' + content.id)
    .set({
      date: content.date,
      dateNow: content.dateNow,
      id : content.id,
      type: 'image',
      content: url
    })
  }

  static getEntries(user, callback) {
    return firebase
    .database()
    .ref('users/' + user + '/entries/')
    .once('value')
    .then(snapshot => {
      const values = _.valuesIn(snapshot.val())
      // alert(JSON.stringify(values))
      const sorted = _.sortBy(values, val => parseInt(val.dateNow))
      callback(sorted)
    })
  }

  static deleteNote(id) {
    fetch(config.databaseUrl + '/notes/' + id + '.json', {
      method: 'DELETE',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}