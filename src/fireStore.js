import firebase from "react-native-firebase";

class FireStoreDetail {
  uid = "";
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    this.db = firebase.firestore();
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
  loadMessages(callback) {
    let newValue = [];
    this.db
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot(value => {
        datas = value.docs;
        datas.forEach(data => {
          let isValue = newValue.some(val => val._id === data.id);
          if (!isValue) {
            newValue.push({
              _id: data.id,
              text: data._data.text,
              createdAt: new Date(data._data.createdAt),
              user: {
                _id: data._data.user._id,
                name: data._data.user.name
              }
            });
            callback({
              _id: data.id,
              text: data._data.text,
              createdAt: new Date(data._data.createdAt),
              user: {
                _id: data._data.user._id,
                name: data._data.user.name
              }
            });
          }
        });
      });
  }

  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.db.collection("messages").add({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }
}
export default new FireStoreDetail();
