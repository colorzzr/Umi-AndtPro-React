import React, { PureComponent } from 'react';
import { Button, Input, Form } from 'antd';

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

class RoomMsgSend extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      roomMsg: [],
    };

    const { socket } = this.props;
    socket.on('roomBoardcast', data => {
      const { roomMsg } = this.state;
      console.log(`roomBoardcast: ${data}`);
      const temp = objDeepCopy(roomMsg);
      temp.push(data);
      this.setState({
        roomMsg: temp,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket, currentRoom } = this.props;

    // calling the effect for search
    form.validateFields((err, values) => {
      if (!err) {
        console.log(err, values);
        socket.emit('roomBoardcastTest', currentRoom, values.message);
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    // forming message list
    const { roomMsg } = this.state;
    const msgList = [];
    for (let i = 0; i < roomMsg.length; i += 1) {
      msgList.push(<li key={i}>{roomMsg[i]}</li>);
    }

    return (
      <div>
        <div>
          <h3>Room Message List</h3>
          <ul>{msgList}</ul>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="message" label="Boardcast Message">
            {getFieldDecorator('message', {
              rules: [{ required: true, message: 'Please input room name!' }],
            })(<Input placeholder="Message" />)}
          </FormItem>
          <FormItem key="submitButton">
            <Button type="primary" htmlType="submit">
              {' '}
              Room Boardcast Test{' '}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const RoomMsgSendForm = Form.create()(RoomMsgSend);
export default RoomMsgSendForm;
