// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDGaP7yMEeu1g603Cotmb6PBcwL73C3BKg',
  authDomain: 'woof-1e82f.firebaseapp.com',
  databaseURL: 'https://woof-1e82f.firebaseio.com',
  projectId: 'woof-1e82f',
  storageBucket: 'woof-1e82f.appspot.com',
  messagingSenderId: '838562082162'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

var woofInput = document.getElementById('woof-text')
var woofButton = document.getElementById('woof-button')
var woofDiv = document.getElementById('woofs')
var updateText = function () {
  var woofInputText = woofInput.value
  var currentDate = Date()
  firebase.database().ref('messages').child(woofInputText).set({
    created_at: currentDate,
    text: woofInputText
  })
}
firebase.database().ref('messages')
.on('value', function (allJokesSnapshot) {
  console.log(allJokesSnapshot.val())
  for (var key in allJokesSnapshot.val()) {
    var value = allJokesSnapshot.val()[key]
    console.log(value)
    var buttonDelete = '<button type="button" id="' + key + 'Delete" class="close btn-delete" aria-label="Delete"><small><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></small></button>'
    var buttonEdit = '<button type="button"  id="' + key + 'Edit" class="close btn-edit" aria-label="Edit"><small><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></small></button>'
    woofDiv.innerHTML += '<b>Message Key</b>:' + key + ' <br> <b>Text:</b> ' + value['text'] + '<br> <b>Created_at: </b>' + value['created_at'] + buttonDelete + buttonEdit + '<br><br>'


  }
})
woofButton.addEventListener('click', updateText)

document.querySelector('#woof-text').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode
  if (key === 13) {
    updateText()
    woofInput.value = ''
  }
})

/*
firebase.database().ref('jokes').push({
  setup: 'What do you call a bear with no teeth?',
  punchline: 'A gummy bear!'
})
*/
