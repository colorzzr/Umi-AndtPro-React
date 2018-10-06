import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, Popover } from 'antd';
// import style from './index.less';

const content = (
  <div>
    <p>Welcome!</p>
  </div>
);
class UserPopWindow extends PureComponent {
  render() {
    const { user } = this.props;
    console.log(user);
    let userName;

    if (user !== undefined) {
      userName = <h1>{user.userName}</h1>;
    } else {
      userName = '';
    }

    return (
      <Popover placement="topLeft" title={userName} content={content} trigger="click">
        <Avatar style={{ backgroundColor: '#f56a00' }} size="large" icon="user" />
      </Popover>
    );
  }
}

export default connect(({ user }) => ({
  user,
}))(UserPopWindow);

// <Avatar shape="square" size="large" icon="user" className={style.userIcon}/>
