import config from '../config'

export default {
  uploadNote: function(note) {
    fetch(config.databaseUrl + '/notes/' + note.id + '.json', {
      method: 'PUT',
      body: JSON.stringify(note)
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },

  uploadPictureBase64: function(base64Str) {
    fetch(config.databaseUrl + '/images/' + 'asdf' + '.json', {
      method: 'PUT',
      body: JSON.stringify({base64: base64Str})
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },

  downloadNotes: function(callback) {
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
  },

  deleteNote(id) {
    fetch(config.databaseUrl + '/notes/' + id + '.json', {
      method: 'DELETE',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}