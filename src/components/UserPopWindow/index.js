import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, Popover } from 'antd';
// import style from './index.less';

class UserPopWindow extends PureComponent {
  render() {
    const { userStatus } = this.props;
    console.log(userStatus);

    let userName;

    if (userStatus !== undefined) {
      userName = <h1>{userStatus.userName}</h1>;
    } else {
      userName = '';
    }

    const content = (
      <div>
        <p>Welcome!</p>
      </div>
    );

    return (
      <div>
        <Popover placement="topLeft" title={userName} content={content} trigger="click">
          <Avatar style={{ backgroundColor: '#f56a00' }} size="large" icon="user" />
        </Popover>
      </div>
    );
  }
}

export default connect(({ userStatus }) => ({
  userStatus,
}))(UserPopWindow);

// <Avatar shape="square" size="large" icon="user" className={style.userIcon}/>
