import firebase from 'firebase'
const uuid = require('uuid/v1')
import config from '../config'

firebase.initializeApp(config.firebase)

export default class Database {
  static uploadContent(content) {
    const stampedContent = {
      ...content, 
      id: uuid(), 
      date: new Date().toString()
    }

    switch(content.type) {
      case 'image':
        this._uploadImage(stampedContent)
        break
      case 'text':
        this._uploadText(stampedContent)
    }
  }

  static _uploadText(content) {
    firebase
    .database()
    .ref('users/' + content.user + '/entries/' + content.id)
    .set({
      date: content.date,
      id : content.id,
      type: 'text',
      content: content.text
    })
  }

  static _uploadGif(content) {
    firebase
    .database()
    .ref('users/' + content.user + '/entries/' + content.id)
    .set({
      date: content.date,
      id : content.id,
      type: 'gif',
      content: content.url
    })
  }

  static async _uploadImage(content) {
    firebase
    .database()
    .ref('users/' + content.user + '/entries/' + content.id)
    .set({
      date: content.date,
      id : content.id,
      type: 'image'
    })

    const response = await fetch(content.uri)
    const blob = await response.blob()
    firebase
    .storage()
    .ref()
    .child('images')
    .child(content.id + '.jpg')
    .put(blob)
    .then(snapshot => {
      console.log('uploaded!')
    })
    .catch(err => {
      console.log(err)
    })
  }

  static downloadNotes(callback) {
    fetch(config.databaseUrl + '/notes.json',)
    .then(res => res.json())
    .then(parsedRes => {
      const conversationsArray = []
      
      for (const key in parsedRes) {
        const note = parsedRes[key]
        conversationsArray.push(note)
      }
      callback(conversationsArray)
    })
    .catch(err => console.log(err))
  }

  static deleteNote(id) {
    fetch(config.databaseUrl + '/notes/' + id + '.json', {
      method: 'DELETE',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}