  // Initialize Firebase
var config = {
  apiKey: "AIzaSyDnZOn1-oL44xaGilC2JaGzVIIE393yw_w",
  authDomain: "joke-a-tron-9000-c692b.firebaseapp.com",
  databaseURL: "https://joke-a-tron-9000-c692b.firebaseio.com",
  projectId: "joke-a-tron-9000-c692b",
  storageBucket: "joke-a-tron-9000-c692b.appspot.com",
  messagingSenderId: "744518658604"
  }
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

firebase.database().ref('jokes').push({
  setup: 'What do you call a bear with no teeth?',
  punchline: 'A gummy bear!'
})
