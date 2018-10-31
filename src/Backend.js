import firebase from "firebase";

class Backend {
  uid = "";
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBNH3p8ihzqbh6KMINbjAm5adqMXbyFa8E",
      authDomain: "test-project-9fd71.firebaseapp.com",
      databaseURL: "https://test-project-9fd71.firebaseio.com",
      projectId: "test-project-9fd71",
      storageBucket: "test-project-9fd71.appspot.com",
      messagingSenderId: "407426614934"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user", user);
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            alert(error.message);
          });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  //reterive message form firebase
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref("messages");
    this.messagesRef.off();
    const onRecive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on("child_added", onRecive);
  }
  //send the message to the Backend

  sendMessage(message) {
    console.log("message is", message);
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }
  //close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
