import React, { PureComponent } from 'react';
import { Button } from 'antd';
import io from 'socket.io-client';
import JoinRoomForm from './joinRoom';
import RoomMsgSendForm from './roomMsgSend';

// const FormItem = Form.Item;

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

// class JoinRoom extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.handleSubmit = this.handleSubmit.bind(this);

//     this.state = {};
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const { form, socket } = this.props;

//     // calling the effect for search
//     form.validateFields((err, values) => {
//       console.log(err,values);
//       socket.emit('join', values.roomName);
//     });
//   }

//   render(){
//     const { form } = this.props;
//     const { getFieldDecorator } = form;
//     return(
//       <Form onSubmit={this.handleSubmit}>
//         <FormItem key="roomName" label="Room Name">
//           {getFieldDecorator("roomName", {})(<Input placeholder="Room Name" />)}
//         </FormItem>
//         <FormItem key="submitButton">
//           <Button type="primary" htmlType="submit"> join Room Test </Button>
//         </FormItem>
//       </Form>
//     );
//   }
// }
// const JoinRoomForm = Form.create()(JoinRoom);

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
    this.changeRoom = this.changeRoom.bind(this);
    // this.joinRoomTest = this.joinRoomTest.bind(this);
    // this.roomBoardcastTest = this.roomBoardcastTest.bind(this);

    this.state = {
      socket,
      message: [],
      currentRoom: 'nothing',
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

  // acensetor function for changing room
  changeRoom(e) {
    e.preventDefault();
    this.setState({
      currentRoom: e.target.id,
    });
  }
  // joinRoomTest() {
  //   const { socket } = this.state;
  //   socket.emit('join');
  // }

  // roomBoardcastTest() {
  //   const { socket } = this.state;
  //   socket.emit('roomBoardcastTest');
  // }

  render() {
    const { data, message, socket, currentRoom } = this.state;
    const { protocalCode } = data;
    const msgList = [];
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
        <br />
        <br />
        <JoinRoomForm socket={socket} changeRoom={this.changeRoom} currentRoom={currentRoom} />
        <RoomMsgSendForm socket={socket} currentRoom={currentRoom} />
      </div>
    );
  }
}

export default TunelGame;
