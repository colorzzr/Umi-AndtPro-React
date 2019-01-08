import React, { PureComponent } from 'react';
import { Button, Input, Form } from 'antd';
import style from './joinRoom.less';

const FormItem = Form.Item;

// function objDeepCopy(source) {
//   // check it is the array or object
//   const sourceCopy = source instanceof Array ? [] : {};

//   const keys = Object.keys(source);

//   for (let i = 0; i < keys.length; i += 1) {
//     // eslint-disable-line no-use-before-define
//     if (source != null) {
//       // recursively check the obj in array
//       sourceCopy[keys[i]] =
//         typeof source[keys[i]] === 'object' ? objDeepCopy(source[keys[i]]) : source[keys[i]];
//     }
//   }
//   return sourceCopy;
// }

class FriendList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket, userName, logFriend } = this.props;

    // calling the effect for search
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        // problem here the web is holding the data in total if other user is in all stuff is flushed so
        // need a method!
        socket.emit('addFriend', userName, values.friendName, returnMsg => {
          console.log(returnMsg);
          if (returnMsg.data === 'successfully add friend') {
            // and get the friends after there
            socket.emit('queryFriend', values.userName, returnMsgy => {
              console.log(returnMsgy);
              if (returnMsgy.data === 'Sorry you have no friend :(\0') {
                const temp = [];
                logFriend(temp);
              } else {
                logFriend(returnMsgy.data);
              }
            });
          }
        });
      }
    });
  }

  render() {
    const { form, userName, friend } = this.props;
    const { getFieldDecorator } = form;

    // forming the list of rooms
    const friendList = [];
    for (let i = 0; i < friend.length; i += 1) {
      friendList.push(
        <li key={i}>
          <Button id={`${friend[i]}join`}>{friend[i]}</Button>
        </li>
      );
    }

    return (
      <div>
        <div className={style.chatRoom}>
          <h3>Friend List is</h3>
          <ul>{friendList}</ul>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="firendName" className={style.formItem}>
            {getFieldDecorator('friendName', {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    const errors = [];
                    if (userName === 'nothing') {
                      errors.push('Plz Login!');
                    } else if (value === undefined) {
                      errors.push('Plz Entry Friend Name!');
                    }
                    callback(errors);
                  },
                },
              ],
            })(<Input placeholder="Friend Name" />)}
          </FormItem>
          <FormItem key="submitButton" className={style.formItem}>
            <Button type="primary" htmlType="submit">
              {' '}
              Add New Friend!{' '}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const FriendListForm = Form.create()(FriendList);
export default FriendListForm;
