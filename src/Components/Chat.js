import React from "react";
import PropTypes from "prop-types";
import { GiftedChat } from "react-native-gifted-chat";
import Backend from "../Backend";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillMount() {}
  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          console.log("messags", message);
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
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
