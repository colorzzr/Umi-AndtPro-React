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
      type: 'loginedIn/needLogin',
    });
  }

  render() {
    const { location, loginedIn } = this.props;
    const { status } = loginedIn;
    let loginOrUser;
    console.log(loginedIn);

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
              <Menu.Item key="/myserver/PersonalInfo">
                <Link to="/myserver/PersonalInfo">
                  <Icon type="info-circle" theme="outlined" />
                  Myself
                </Link>
              </Menu.Item>
              <Menu.Item key="/myserver/IndexPage">
                <Link to="/myserver/IndexPage">
                  <Icon type="home" />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="/myserver/counter">
                <Link to="/myserver/counter">
                  <Icon type="frown-circle" />
                  Counter
                </Link>
              </Menu.Item>
              <Menu.Item key="/myserver/Calculator">
                <Link to="/myserver/Calculator">
                  <Icon type="calculator" />
                  Calculator
                </Link>
              </Menu.Item>
              <Menu.Item key="/myserver/History">
                <Link to="/myserver/History">
                  <Icon type="api" />
                  History
                </Link>
              </Menu.Item>
              <Menu.Item key="/myserver/TubeGame">
                <Link to="/myserver/TubeGame">
                  <Icon type="smile" />
                  Tube Game
                </Link>
              </Menu.Item>
              <Menu.Item key="/myserver/Reversi">
                <Link to="/myserver/Reversi">
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

export default connect(({ historyDatas, loginedIn }) => ({
  historyDatas,
  loginedIn,
}))(Header);
