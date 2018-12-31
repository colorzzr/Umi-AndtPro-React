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

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket, changeUserWhenLogin } = this.props;

    // calling the effect for search
    form.validateFields((err, values) => {
      if (!err) {
        console.log(err, values);
        socket.emit('login', values.userName, values.password, returnMsg => {
          console.log(returnMsg);
          if (returnMsg.data === 'success') {
            changeUserWhenLogin(values.userName);
          }
        });
      }
    });
  }

  render() {
    const { form, userName } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <h2 className={styles.formItem}>{`Current User ${userName}`}</h2>
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
      </div>
    );
  }
}
const UserLoginForm = Form.create()(UserLogin);
export default UserLoginForm;
