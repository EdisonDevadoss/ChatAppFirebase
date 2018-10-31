import React from "react";
import PropTypes from "prop-types";
import { GiftedChat } from "react-native-gifted-chat";
import FireStoreDetail from "../fireStore";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillMount() {}
  componentDidMount() {
    FireStoreDetail.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }
  // componentWillUnmount() {
  //   Backend.closeChat();
  // }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          console.log("messags", message);
          FireStoreDetail.sendMessage(message);
        }}
        user={{
          _id: FireStoreDetail.getUid(),
          name: this.props.name
        }}
      />
    );
  }
}

Chat.defaultProps = {
  name: "Edison"
};
Chat.propType = {
  name: PropTypes.string
};

export default Chat;
