import React, { PureComponent } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import style from './Login.less';

const FormItem = Form.Item;

class RegisterForm extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  // checking the two field are the same
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  // when user want to change pd not confirm pd
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    // if value is not null and two pds are same force the field to be ok
    if (value && value === form.getFieldValue('confirm')) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'loginedIn/register',
          payload: {
            ...values,
          },
        });
        // console.log(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={style.main}>
        <h1 className={style.LoginText}>Register</h1>
        <Form onSubmit={this.handleSubmit} className={style.LoginFrom}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Register = Form.create()(RegisterForm);

export default connect()(Register);
