import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import io from 'socket.io-client';
import JoinRoomForm from './joinRoom';
import RoomMsgSendForm from './roomMsgSend';
import UserLoginForm from './userLogin';
import FriendListForm from './friendList';

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
    // const socket = io('http://18.223.112.55:3000');
    const socket = io('http://localhost:3000');

    this.changeRoom = this.changeRoom.bind(this);
    this.changeRoomWhenJoin = this.changeRoomWhenJoin.bind(this);
    this.changeUserWhenLogin = this.changeUserWhenLogin.bind(this);
    this.removeRoomWhenLeave = this.removeRoomWhenLeave.bind(this);
    this.logFriend = this.logFriend.bind(this);

    this.state = {
      socket,
      message: {
        nothing: [],
      },
      friend: [],
      currentRoom: 'nothing',
      userName: 'nothing',
      data: {
        protocalCode: -1,
      },
    };

    // taking the thread for broadcast
    socket.on('broadcast', returnMsg => {
      const { message, currentRoom } = this.state;
      console.log('boardcast!');
      const { source, data } = returnMsg;

      // deep copy the array for the state change
      const temp = objDeepCopy(message);
      temp[currentRoom].push(`${source}:${data}`);
      console.log(temp);
      this.setState({
        message: temp,
        data: returnMsg,
      });
    });

    socket.on('roomBoardcast', data => {
      const { message, currentRoom } = this.state;
      console.log(`roomBoardcast: ${data}`);
      const temp = objDeepCopy(message);
      temp[currentRoom].push(data);
      this.setState({
        message: temp,
      });
    });
  }

  // acensetor function for changing room
  changeRoom(e) {
    e.preventDefault();

    const { currentRoom } = this.state;
    // trucate the message when change the room
    if (e.target.id !== currentRoom) {
      this.setState({
        currentRoom: e.target.id,
      });
    }
  }

  changeRoomWhenJoin(roomName) {
    const { message } = this.state;
    const temp = objDeepCopy(message);
    // adding a new field for new room
    temp[roomName] = [];
    this.setState({
      currentRoom: roomName,
      message: temp,
    });
  }

  changeUserWhenLogin(userName) {
    this.setState({
      userName,
    });
  }

  removeRoomWhenLeave() {
    this.setState({
      currentRoom: 'nothing',
    });
  }

  logFriend(friend) {
    this.setState({
      friend,
    });
  }

  render() {
    const { data, message, socket, currentRoom, userName, friend } = this.state;
    const { protocalCode } = data;

    return (
      <div>
        <h1>test Page</h1>
        <h1> current protocal test {protocalCode}</h1>
        <UserLoginForm
          socket={socket}
          changeUserWhenLogin={this.changeUserWhenLogin}
          userName={userName}
          logFriend={this.logFriend}
        />
        <Row>
          <Col span={12}>
            <RoomMsgSendForm
              socket={socket}
              currentRoom={currentRoom}
              message={message[currentRoom]}
              userName={userName}
            />
          </Col>
          <Col span={1} />
          <Col span={5}>
            <FriendListForm
              socket={socket}
              userName={userName}
              friend={friend}
              logFriend={this.logFriend}
            />
          </Col>
          <Col span={1} />
          <Col span={5}>
            <JoinRoomForm
              socket={socket}
              changeRoom={this.changeRoom}
              currentRoom={currentRoom}
              userName={userName}
              changeRoomWhenJoin={this.changeRoomWhenJoin}
              removeRoomWhenLeave={this.removeRoomWhenLeave}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TunelGame;
