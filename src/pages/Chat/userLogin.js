import React, { PureComponent } from 'react';
import { Button, Input, Form } from 'antd';
import styles from './userLogin.less';

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

class UserLogin extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket, changeUserWhenLogin, logFriend } = this.props;

    // calling the effect for search
    form.validateFields((err, values) => {
      if (!err) {
        console.log(err, values);
        socket.emit('login', values.userName, values.password, returnMsg => {
          console.log(returnMsg);
          if (returnMsg.data === 'success') {
            changeUserWhenLogin(values.userName);
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

  logout(e) {
    e.preventDefault();
    const { socket, changeUserWhenLogin } = this.props;

    socket.emit('logout', returnMsg => {
      console.log(returnMsg);
    });
    changeUserWhenLogin('nothing');
  }

  render() {
    const { form, userName } = this.props;
    const { getFieldDecorator } = form;
    let loginComponent;
    if (userName === 'nothing') {
      loginComponent = (
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="User Name" label="User Name" className={styles.formItem}>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input user name!' }],
            })(<Input placeholder="User Name" />)}
          </FormItem>
          <FormItem key="Password" label="Password" className={styles.formItem}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input password name!' }],
            })(<Input placeholder="Password" />)}
          </FormItem>
          <FormItem key="submitButton" className={styles.formItem}>
            <Button type="primary" htmlType="submit">
              {' '}
              Login{' '}
            </Button>
          </FormItem>
        </Form>
      );
    } else {
      loginComponent = (
        <div className={styles.buttonStyle}>
          <h2 className={styles.formItem}>{`Current User ${userName}`}</h2>
          <Button type="danger" onClick={this.logout}>
            {' '}
            Logout{' '}
          </Button>
        </div>
      );
    }

    return <div>{loginComponent}</div>;
  }
}
const UserLoginForm = Form.create()(UserLogin);
export default UserLoginForm;
