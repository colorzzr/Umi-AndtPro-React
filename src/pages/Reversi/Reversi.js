import React, { PureComponent } from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import { Row, Col, Button, Modal } from 'antd';
import styles from './Reversi.less';
import whiteChess from '../../assets/Reversi/white chess.png';
import blackChess from '../../assets/Reversi/black chess.png';
// import ableMove from '../../assets/Reversi/able move chess.png';

function info() {
  // this.funcName = 'info';
  Modal.info({
    title: '------Team Contributor List------',
    content: (
      <div>
        <p>
          Algorithm Designer: <a href="https://github.com/kmomuphnie"> Dongfang Cui </a>
        </p>
        <p>Web Designer && Back-front Connection: Zhiren Zhan</p>
        <p>Alpha Tester: Yueshuang Zhang, Yuqing Li</p>
      </div>
    ),
    onOk() {},
  });
}

class ReversiGame extends PureComponent {
  constructor(props) {
    super(props);
    this.sendToBack = this.sendToBack.bind(this);
    this.showRefreshWarning = this.showRefreshWarning.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log(id);

    this.state = {
      map: [],
      playerPoint: 2,
      AIPoint: 2,
      winner: '',
      showRefresh: false,
    };
  }

  componentWillMount() {
    const map = [];
    for (let i = 0; i < 8; i += 1) {
      map[i] = [];
      for (let j = 0; j < 8; j += 1) {
        map[i].push('_');
      }
    }

    map[3][3] = 'W';
    map[3][4] = 'B';
    map[4][3] = 'B';
    map[4][4] = 'W';

    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'reversi/saveMatchInfo',
    //   payload: {
    //     map,
    //     playerPoint: 2,
    //     AIPoint: 2,
    //     winner: '',
    //   },
    // });
    this.setState({
      map,
    });
  }

  sendToBack(target) {
    // console.log(target.target.id);
    const curMove = parseInt(target.target.id, 10);
    const curMoveStr = Math.floor(curMove / 8).toString() + (curMove % 8).toString();

    // const { reversi } = this.props;
    const { map } = this.state;

    const obj = {
      Move: curMoveStr,
      Map: map,
    };

    // $.post('http://localhost:8007/Reversi', {
    $.post(
      'http://18.223.112.55:8007/Reversi',
      {
        first: JSON.stringify(obj),
      },
      data => {
        console.log(data);
        // change back to json
        let sendBackData = JSON.parse(data);

        // IDK why this is so magic that I need convert from []byte->string->json
        sendBackData = JSON.parse(sendBackData);
        const { Board, UserPoint, AIPoint, Winner } = sendBackData;
        console.log(Board, UserPoint, AIPoint, Winner);

        // const { dispatch } = this.props;
        // dispatch({
        //   type: 'reversi/saveMatchInfo',
        //   payload: {
        //     map: Board,
        //     playerPoint: UserPoint,
        //     AIPoint,
        //     winner: Winner,
        //   },
        // });
        this.setState({
          map: Board,
          playerPoint: UserPoint,
          AIPoint,
          winner: Winner,
        });
      }
    );
  }

  showRefreshWarning() {
    this.setState({
      showRefresh: true,
    });
  }

  handleOk() {
    this.setState({
      showRefresh: false,
    });

    this.componentWillMount();
  }

  handleCancel() {
    this.setState({
      showRefresh: false,
    });
  }

  render() {
    const { showRefresh, map, playerPoint, AIPoint, winner } = this.state;
    // const { loading } = this.props;

    const chessBoard = [];
    // change to loading later <-----------------------look at this!
    if (map !== undefined && map.length !== 0) {
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          if (map[i][j] === 'W') {
            chessBoard.push(
              <li key={i * 8 + j}>
                <img src={whiteChess} alt="whiteChess" />
              </li>
            );
          } else if (map[i][j] === 'B') {
            chessBoard.push(
              <li key={i * 8 + j}>
                <img src={blackChess} alt="blackChess" />
              </li>
            );
          } else {
            chessBoard.push(<li key={i * 8 + j} id={i * 8 + j} onClick={this.sendToBack} />);
          }
        }
      }
    }

    let scoreBoard;
    if (winner === 'AI') {
      scoreBoard = <h1 className={styles.header}> AI Wins! </h1>;
    } else if (winner === 'Player') {
      scoreBoard = <h1 className={styles.header}> Player Wins! </h1>;
    } else if (winner === 'Draw') {
      scoreBoard = <h1 className={styles.header}> Draw! </h1>;
    } else {
      scoreBoard = (
        <h1 className={styles.header}>
          {' '}
          {playerPoint} Vs {AIPoint}{' '}
        </h1>
      );
    }

    return (
      <div className={styles.wholeWindow}>
        <h1 className={styles.header}>ReversiGame</h1>
        <div>
          <Button type="danger" size="default" onClick={this.showRefreshWarning}>
            Refresh Board
          </Button>
          <Button size="default" onClick={info}>
            Credit
          </Button>
        </div>
        <div className={styles.headHolder}>
          <Row>
            <Col span={6}>
              <Row>
                <Col span={12}>
                  <img className={styles.scoreBoardTag} src={blackChess} alt="blackChess" />
                </Col>
                <Col span={12}>
                  <div className={styles.AIUserTag}>
                    <p>User</p>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col span={12}>{scoreBoard}</Col>

            <Col span={6}>
              <Row>
                <Col span={12}>
                  <img className={styles.scoreBoardTag} src={whiteChess} alt="whiteChess" />
                </Col>
                <Col span={12}>
                  <div className={styles.AIUserTag}>
                    <p>AI</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <ul className={styles.chessplane}>{chessBoard}</ul>

        <Modal visible={showRefresh} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>------Warning!------</p>
          <p>You will lose all procedure</p>
        </Modal>
      </div>
    );
  }
}

export default connect(({ loading, reversi }) => ({
  loading,
  reversi,
}))(ReversiGame);
