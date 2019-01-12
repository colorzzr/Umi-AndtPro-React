import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Row, Col, Spin, Alert } from 'antd';
import $ from 'jquery';
/*
class Counter extends React.Component {
  constructor(props) {
super(props);

this.state = { number: 55 };
this.add = this.add.bind(this);
this.lose = this.lose.bind(this);
  }

  add() {
// const num = this.state.number;
// this.setState({number:num + 1});
    this.state.number = this.state.number + 1;
    console.log(this.state.number);
  }
  lose() {
    const num = this.state.number;
    this.setState({ number: num - 1 });
    console.log(this.state.number);
  }

  render() {
    return (
      <div>
        <h2>Count:{this.state.number}</h2>
        <h2>Count:{counterMod}</h2>
        <Button onClick={this.add}> Click! </Button>
        <Button onClick={this.lose}> Lose! </Button>
      </div>
    );
  }
}
*/

function Counter({ dispatch, counterMod, loading }) {
  const style1 = {
    backgroundColor: '#1fde11',
    color: '#324',
    textAlign: 'center',
  };

  function add() {
    dispatch({
      type: 'counterMod/add',
    });
  }

  function minus() {
    dispatch({
      type: 'counterMod/minus',
    });
  }

  function test() {
    console.log('test');
    $.post(
      'http://localhost:3000',
      {
        first: '0:4:color:1111',
      },
      data => {
        console.log(data);
      }
    );
  }

  const value = 12313213;

  console.log(loading);
  let spinCheck = loading.models.counterMod;
  if (spinCheck === undefined) {
    spinCheck = false;
  }

  return (
    <div>
      <Spin tip="Loading..." spinning={spinCheck}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
        <Row>
          <Col style={style1}>
            <h2>
              Count:
              {counterMod.count}
            </h2>
            <Button onClick={add}> add ! </Button>
            <Button onClick={minus}> minus ! </Button>
          </Col>
        </Row>
        <Link to={`/myserver/user/${value}`}>
          <Button>查看详情</Button>
        </Link>
        <Button onClick={test}>test</Button>
      </Spin>
    </div>
  );
}

export default connect(({ counterMod, loading }) => ({
  counterMod,
  // loading : loading.models.counterMod,
  loading,
}))(Counter);
