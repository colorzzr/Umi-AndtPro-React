import React, { PureComponent } from 'react';
import { Button, Input, Form } from 'antd';

const FormItem = Form.Item;

class JoinRoom extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket } = this.props;

    // calling the effect for search
    form.validateFields((err, values) => {
      console.log(err, values);
      socket.emit('join', values.roomName);
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem key="roomName" label="Room Name">
          {getFieldDecorator('roomName', {})(<Input placeholder="Room Name" />)}
        </FormItem>
        <FormItem key="submitButton">
          <Button type="primary" htmlType="submit">
            {' '}
            join Room Test{' '}
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const JoinRoomForm = Form.create()(JoinRoom);
export default JoinRoomForm;
