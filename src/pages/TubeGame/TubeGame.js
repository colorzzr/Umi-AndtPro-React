import React, { PureComponent } from 'react';
import { Button } from 'antd';
import $ from 'jquery';
import style from './TubeGame.less';
import { GenerateRandomNum } from '../../utils/utils';
import tunel1 from '../../assets/Tunel Game/1.png';
import tunel2 from '../../assets/Tunel Game/2.png';
import tunel3 from '../../assets/Tunel Game/3.png';
import tunel4 from '../../assets/Tunel Game/4.png';
import tunel5 from '../../assets/Tunel Game/5.png';
import tunel6 from '../../assets/Tunel Game/6.png';
import tunel1Correct from '../../assets/Tunel Game/1through.png';
import tunel2Correct from '../../assets/Tunel Game/2through.png';
import tunel3Correct from '../../assets/Tunel Game/3through.png';
import tunel4Correct from '../../assets/Tunel Game/4through.png';
import tunel5Correct from '../../assets/Tunel Game/5through.png';
import tunel6Correct from '../../assets/Tunel Game/6through.png';

let map = [];
class TunelGame extends PureComponent {
  constructor(props) {
    super(props);

    this.changeDirection = this.changeDirection.bind(this);
    this.GenerateMap = this.GenerateMap.bind(this);
    this.printCorrectPath = this.printCorrectPath.bind(this);
    this.sendToBack = this.sendToBack.bind(this);

    this.state = {
      bitMap: '',
    };
  }

  // construct the map before mount
  componentWillMount() {
    this.GenerateMap();
  }

  systemCheckSendBack() {
    const { bitMap } = this.state;
    const obj = {
      BitMap: bitMap,
    };

    $.post(
      'http://18.223.112.55:4399/systemAns',
      {
        first: JSON.stringify(obj),
      },
      data => {
        // change back to json
        let sendBackData = JSON.parse(data);

        // IDK why this is so magic that I need convert from []byte->string->json
        sendBackData = JSON.parse(sendBackData);
        const { ReturnAns } = sendBackData;
        // if there is no solution regenerate map
        if (!ReturnAns) {
          this.GenerateMap();
        }
      }
    );
  }

  // forming map randomly
  GenerateMap() {
    // reset map
    map = [];

    const bitMap = [];
    for (let i = 0; i < 5; i += 1) {
      bitMap[i] = [];
    }

    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        // forming the map
        let img;
        // if(j > 0 && j < 6){
        const r0to5 = GenerateRandomNum(0, 6);

        // the img index is format by "imgNumber" + 'i-Index' + "j-index"
        const indexImg = i.toString() + j.toString();
        switch (r0to5) {
          case 0:
            bitMap[i][j] = 0;
            img = <img alt={`0${indexImg}`} src={tunel1} onClick={this.changeDirection} />;
            break;
          case 1:
            bitMap[i][j] = 1;
            img = <img alt={`1${indexImg}`} src={tunel2} onClick={this.changeDirection} />;
            break;
          case 2:
            bitMap[i][j] = 2;
            img = <img alt={`2${indexImg}`} src={tunel3} onClick={this.changeDirection} />;
            break;
          case 3:
            bitMap[i][j] = 3;
            img = <img alt={`3${indexImg}`} src={tunel4} onClick={this.changeDirection} />;
            break;
          case 4:
            bitMap[i][j] = 4;
            img = <img alt={`4${indexImg}`} src={tunel5} onClick={this.changeDirection} />;
            break;
          case 5:
            bitMap[i][j] = 5;
            img = <img alt={`5${indexImg}`} src={tunel6} onClick={this.changeDirection} />;
            break;
          default:
            img = <h1>missing</h1>;
            break;
        }

        map.push(<li key={i * 5 + j}>{img}</li>);
      }
    }

    // then set map state
    this.setState(
      {
        bitMap,
      },
      this.systemCheckSendBack
    );
  }

  changeDirection(image) {
    const imgInfo = image.target.alt;
    const imgTag = imgInfo[0];
    const iIndex = parseInt(imgInfo[1], 10);
    const jIndex = parseInt(imgInfo[2], 10);
    const { bitMap } = this.state;

    // image.target.setAttribute("alt", "1111");
    let newInfo;
    // change the image && aalt && bitMap
    switch (imgTag) {
      case '0':
        bitMap[iIndex][jIndex] = 1;
        // image.target.src = tunel2;
        newInfo = `1${iIndex.toString()}${jIndex.toString()}`;
        image.target.setAttribute('alt', newInfo);
        image.target.setAttribute('src', tunel2);
        break;
      case '1':
        bitMap[iIndex][jIndex] = 0;
        // image.target.src = tunel1;
        newInfo = `0${iIndex.toString()}${jIndex.toString()}`;
        image.target.setAttribute('alt', newInfo);
        image.target.setAttribute('src', tunel1);
        break;
      case '2':
        bitMap[iIndex][jIndex] = 3;
        // image.target.src = tunel4;
        newInfo = `3${iIndex.toString()}${jIndex.toString()}`;
        image.target.setAttribute('alt', newInfo);
        image.target.setAttribute('src', tunel4);
        break;
      case '3':
        bitMap[iIndex][jIndex] = 4;
        // image.target.src = tunel5;
        newInfo = `4${iIndex.toString()}${jIndex.toString()}`;
        image.target.setAttribute('alt', newInfo);
        image.target.setAttribute('src', tunel5);
        break;
      case '4':
        bitMap[iIndex][jIndex] = 5;
        // image.target.src = tunel6;
        newInfo = `5${iIndex.toString()}${jIndex.toString()}`;
        image.target.setAttribute('alt', newInfo);
        image.target.setAttribute('src', tunel6);
        break;
      case '5':
        bitMap[iIndex][jIndex] = 2;
        // image.target.src = tunel3;
        newInfo = `2${iIndex.toString()}${jIndex.toString()}`;
        image.target.setAttribute('alt', newInfo);
        image.target.setAttribute('src', tunel3);
        break;
      default:
        break;
    }

    // set the state
    this.setState({
      bitMap,
    });
  }

  sendToBack() {
    const { bitMap } = this.state;
    const obj = {
      BitMap: bitMap,
    };

    $.post(
      'http://18.223.112.55:4399/TunelGameProc',
      {
        first: JSON.stringify(obj),
      },
      data => {
        // change back to json
        let sendBackData = JSON.parse(data);

        // IDK why this is so magic that I need convert from []byte->string->json
        sendBackData = JSON.parse(sendBackData);
        const { ReturnAns } = sendBackData;
        console.log(ReturnAns);
        if (ReturnAns !== false) {
          this.printCorrectPath(ReturnAns);
        }
      }
    );
  }

  printCorrectPath(ReturnAns) {
    // const {bitMap} = this.state;
    for (let i = 0; i < ReturnAns.length; i += 1) {
      let img;
      const { X, Y, TubeState } = ReturnAns[i];
      switch (TubeState) {
        case 0:
          img = <img alt="0" src={tunel1Correct} />;
          break;
        case 1:
          img = <img alt="1" src={tunel2Correct} />;
          break;
        case 2:
          img = <img alt="2" src={tunel3Correct} />;
          break;
        case 3:
          img = <img alt="3" src={tunel4Correct} />;
          break;
        case 4:
          img = <img alt="4" src={tunel5Correct} />;
          break;
        case 5:
          img = <img alt="5" src={tunel6Correct} />;
          break;
        default:
          break;
      }
      map[X * 5 + Y] = <li key={X * 5 + Y}>{img}</li>;
    }
    // set the state
    this.setState({
      bitMap: '',
    });
  }

  render() {
    return (
      <div>
        <div className={style.wholeWindow}>
          <h1 className={style.start}>{'Start Here ->'}</h1>
          <ul className={style.map}>{map}</ul>
          <h1 className={style.exit}>{'-> Exit Here'}</h1>
        </div>
        <Button onClick={this.sendToBack}> Finish </Button>
      </div>
    );
  }
}

export default TunelGame;
