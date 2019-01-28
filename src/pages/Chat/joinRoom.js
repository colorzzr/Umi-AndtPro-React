import React, { PureComponent } from 'react';
import { Button, Input, Form } from 'antd';
import style from './joinRoom.less';

const FormItem = Form.Item;

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

class JoinRoom extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);

    this.state = {
      rooms: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket, changeRoomWhenJoin, userName, setReturnMessage } = this.props;
    const { rooms } = this.state;

    // calling the effect for search
    form.validateFields((err, values) => {
      if (!err) {
        console.log(err, values);
        socket.emit('join', values.roomName, userName, returnMsg => {
          setReturnMessage(returnMsg);

          // web take care of rooms
          const temp = objDeepCopy(rooms);
          // give unique value
          if (temp.indexOf(values.roomName) === -1) {
            temp.push(values.roomName);
          }

          this.setState({
            rooms: temp,
          });

          // also change the chat room for parent component
          changeRoomWhenJoin(values.roomName);
        });
      }
    });
  }

  leaveRoom(e) {
    e.preventDefault();

    const { socket, userName, removeRoomWhenLeave, setReturnMessage } = this.props;
    const { rooms } = this.state;
    let temp = objDeepCopy(rooms);
    temp = temp.filter(value => value !== e.target.id);

    // shooting the info to back
    socket.emit('leave', userName, e.target.id, returnMsg => {
      setReturnMessage(returnMsg);
    });

    // set state
    removeRoomWhenLeave();
    this.setState({
      rooms: temp,
    });
  }

  render() {
    const { form, changeRoom, currentRoom, userName } = this.props;
    const { getFieldDecorator } = form;
    const { rooms } = this.state;

    // forming the list of rooms
    const roomList = [];
    for (let i = 0; i < rooms.length; i += 1) {
      roomList.push(
        <li key={i}>
          <Button id={`${rooms[i]}join`} name={rooms[i]} onClick={changeRoom}>
            {rooms[i]}
          </Button>
          <Button id={rooms[i]} onClick={this.leaveRoom} type="danger">
            leave
          </Button>
        </li>
      );
    }

    let RoomNames = 'Please Join the Room';
    // if there is nothing in array
    if (roomList.length !== 0) {
      RoomNames = 'You aare Join the Following Rooms';
    }

    return (
      <div>
        <div className={style.chatRoom}>
          <h3>{RoomNames}</h3>
          <h3>{`Current Room is ${currentRoom}`}</h3>
          <ul>{roomList}</ul>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="roomName" className={style.formItem}>
            {getFieldDecorator('roomName', {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    const errors = [];
                    if (userName === 'nothing') {
                      errors.push('Plz Login!');
                    } else if (value === undefined) {
                      errors.push('Plz Entry Room Name!');
                    }
                    callback(errors);
                  },
                },
              ],
            })(<Input placeholder="Room Name" />)}
          </FormItem>
          <FormItem key="submitButton" className={style.formItem}>
            <Button type="primary" htmlType="submit">
              {' '}
              join Room Test{' '}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const JoinRoomForm = Form.create()(JoinRoom);
export default JoinRoomForm;
