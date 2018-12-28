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

class TunelGame extends PureComponent {
  constructor(props) {
    super(props);
    const socket = io('http://localhost:3000');
    // remember the client side still need event to detect the response
    socket.on('connect', () => {
      // corrosponding with(event_name, arg1, arg2, callback)
      socket.emit('hello', 'init', 'woot', data => {
        console.log(data);
      });
    });

    //   var socket = io(); // TIP: io() with no args does auto-discovery
    // socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    //   socket.emit('ferret', 'tobi', 'woot', function (data) { // args are sent in order to acknowledgement function
    //     console.log(data); // data will be 'tobi says woot'
    //   });
    // });

    this.send = this.send.bind(this);

    this.state = {
      socket,
    };
  }

  send() {
    const { socket } = this.state;
    socket.emit('hello', 'test', 'woot', data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h1>test Page</h1>
        <Button onClick={this.send}> send! </Button>
      </div>
    );
  }
}

export default TunelGame;
