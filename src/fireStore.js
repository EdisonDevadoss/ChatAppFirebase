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
      .where("reciverId", "==", "r4")
      .where("senderId", "==", this.uid)
      .onSnapshot(value => {
        let datas = value.docs;
        datas.forEach(data => {
          console.log("data is", data);
          let isValue = newValue.some(
            (val, i) => val._id === data._data.reciverId
          );
          if (!isValue) {
            newValue.push({
              _id: data.id,
              text: data._data.text,
              createdAt: data._data.createdAt,
              user: {
                _id: data._data.senderId
              }
            });
            callback({
              _id: data.id,
              text: data._data.text,
              createdAt: data._data.createdAt,
              user: {
                _id: data._data.senderId
              }
            });
          }
        });
      });
  }

  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      console.log("message", message);
      let data = {};
      data = {
        senderId: this.uid,
        text: message[i].text,
        reciverId: "r4",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      this.db.collection("messages").add({
        ...data
      });
    }
  }
}
export default new FireStoreDetail();
