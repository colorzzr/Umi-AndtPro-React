import React, { PureComponent } from 'react';
import { Button } from 'antd';

import io from 'socket.io-client';

// var client = new net.Socket();
// OR, if not shimming via package.json "browser" field:
// var net = require('react-native-tcp')

// var server = net.createServer(function(socket) {
//   socket.write('excellent!');
// }).listen(3000);

// var client = net.createConnection(3000);
// client.write('0:4:color:1111');
// client.on('error', function(error) {
//   console.log('Connected');
//   client.write('0:4:color:1111');
//   console.log(error)
// });

// client.on('data', function(data) {
//   console.log('message was received', data)
// });

function objDeepCopy(source) {
  // check it is the array or object
  const sourceCopy = source instanceof Array ? [] : {};

  const keys = Object.keys(source);

  for (let i = 0; i < keys.length; i += 1) {
    // eslint-disable-line no-use-before-define
    if (source != null) {
      // recursively check the obj in array
      sourceCopy[keys[i]] =
        typeof source[keys[i]] === 'object' ? objDeepCopy(source[keys[i]]) : source[keys[i]];
    }
  }
  return sourceCopy;
}

class TunelGame extends PureComponent {
  constructor(props) {
    super(props);
    const socket = io('http://localhost:3000');
    // remember the client side still need event to detect the response
    // socket.on('connect', () => {
    // corrosponding with(event_name, arg1, arg2, callback)
    socket.emit('hello', 'init', 'woot', data => {
      console.log(data);
    });
    // });

    this.defaultColorLogin = this.defaultColorLogin.bind(this);
    this.messageSend = this.messageSend.bind(this);

    this.state = {
      socket,
      message: [],
      data: {
        protocalCode: -1,
      },
    };

    // taking the thread for broadcast
    socket.on('broadcast', returnMsg => {
      const { message } = this.state;
      console.log('boardcast!');
      const { source, data } = returnMsg;

      // deep copy the array for the state change
      const temp = objDeepCopy(message);
      temp.push(`${source}:${data}`);
      console.log(temp);
      this.setState({
        message: temp,
        data: returnMsg,
      });
    });
  }

  defaultColorLogin() {
    const { socket } = this.state;
    socket.emit('login', 'color', '1111', data => {
      console.log(data);
      this.setState({
        data,
      });
    });
  }

  messageSend() {
    const { socket, message } = this.state;
    socket.emit('send', 'color', 'test message', returnMsg => {
      console.log(returnMsg);
      const { source, data } = returnMsg;

      // deep copy the array for the state change
      const temp = objDeepCopy(message);
      temp.push(`${source}:${data}`);
      console.log(temp);
      this.setState({
        message: temp,
        data: returnMsg,
      });
    });
  }

  render() {
    const { data, message } = this.state;
    const { protocalCode } = data;
    const msgList = [];
    console.log(message.length);
    for (let i = 0; i < message.length; i += 1) {
      msgList.push(<li key={i}>{message[i]}</li>);
    }
    return (
      <div>
        <h1>test Page</h1>
        <h1> current protocal test {protocalCode}</h1>
        <div>
          <ul>{msgList}</ul>
        </div>
        <Button onClick={this.defaultColorLogin}> default color login </Button>
        <br />
        <Button onClick={this.messageSend}> message send </Button>
      </div>
    );
  }
}

export default TunelGame;
