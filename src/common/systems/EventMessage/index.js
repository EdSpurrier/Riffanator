import React, { Component } from "react";
import EventBus from "../EventBus";


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: new Array(),
    };
  }

  componentDidMount() {
    EventBus.on("Update Selected Instruments", (data) =>
      this.setState({ message: data.message })
    );
  }

  componentWillUnmount() {
    EventBus.remove("Update Selected Instruments");
  }

  render() {
    return <div>{this.state.message.length}</div>;
  }
}

export default Message;