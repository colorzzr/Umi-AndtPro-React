import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Row, Col, Button } from 'antd';
import { Link } from 'dva/router';
import style from './MHeader.less';
import UserPopWindow from '../components/UserPopWindow/index';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.jumpToLogin = this.jumpToLogin.bind(this);

    this.state = {};
  }

  jumpToLogin() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/needLogin',
    });
  }

  render() {
    const { location, login } = this.props;
    const { status } = login;
    let loginOrUser;
    console.log(login);

    // check whether login
    if (status === true) {
      loginOrUser = <UserPopWindow />;
    } else {
      loginOrUser = (
        <Button className={style.LoginGid} onClick={this.jumpToLogin}>
          Login
        </Button>
      );
    }

    return (
      <div>
        <Row gutter={32} className={style.Header}>
          <Col span={22}>
            <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
              <Menu.Item key="/PersonalInfo">
                <Link to="/PersonalInfo">
                  <Icon type="info-circle" theme="outlined" />
                  Myself
                </Link>
              </Menu.Item>
              <Menu.Item key="/">
                <Link to="/">
                  <Icon type="home" />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="/counter">
                <Link to="/counter">
                  <Icon type="frown-circle" />
                  Counter
                </Link>
              </Menu.Item>
              <Menu.Item key="/Calculator">
                <Link to="/Calculator">
                  <Icon type="calculator" />
                  Calculator
                </Link>
              </Menu.Item>
              <Menu.Item key="/History">
                <Link to="/History">
                  <Icon type="api" />
                  History
                </Link>
              </Menu.Item>
              <Menu.Item key="/TunelGame">
                <Link to="/TunelGame">
                  <Icon type="smile" />
                  Tube Game
                </Link>
              </Menu.Item>
              <Menu.Item key="/Reversi">
                <Link to="/Reversi">
                  <Icon type="smile" />
                  Reversi
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2}>{loginOrUser}</Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ historyDatas, login }) => ({
  historyDatas,
  login,
}))(Header);
