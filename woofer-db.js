// TODO Sign into the database anonymously
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
// CREATE a new woof in Firebase
var woofInput = document.getElementById('woof-text')

function createWoofInDatabase (woof) {
  // TODO create a new record in Firebase
  var woofInputText = woofInput.value
  var currentDate = Date()
  firebase.database().ref('messages').child(woofInputText).set({
    created_at: currentDate,
    text: woofInputText
  })
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).

function removeElementsByClass (className) {
  var elements = document.getElementsByClassName(className)
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0])
  }
}

function readWoofsInDatabase () {
  // TODO read new, changed, and deleted Firebase records
  removeElementsByClass('start')

  firebase.database().ref('messages')
  .once('value').then(function (allJokesSnapshot) {
    console.log(allJokesSnapshot.val())
    for (var key in allJokesSnapshot.val()) {
      var value = allJokesSnapshot.val()[key]
      addWoofRow(key, value)
    }
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  // TODO update the record in Firebase
  firebase.database().ref('messages')
  .once('value').then(function (allJokesSnapshot) {
    console.log(allJokesSnapshot.val())
    var currentDate = Date()
    firebase.database().ref('messages').child(woofKey).set({
      created_at: currentDate,
      text: woofText
    })
  })
  readWoofsInDatabase()
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  // TODO delete the record from Firebase
  firebase.database().ref('messages').child(woofKey).remove()
}
//  Load all of the data
readWoofsInDatabase()
