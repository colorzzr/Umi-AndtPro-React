import React, { PureComponent } from 'react';
import { Button, Input } from 'antd';
import style from './BoundChoose.less';

class BoundChoose extends PureComponent {
  render() {
    const { boundArr, boundNumber, switchInputWindow, finishInputIL } = this.props;
    const okButton = (
      <Button id="UpperOK" onClick={finishInputIL}>
        {' '}
        OK{' '}
      </Button>
    );
    const list = [];
    // formign list by array
    for (let i = 0; i < boundArr.length; i += 1) {
      list.push(
        <li key={i * 2}>
          <Button id={boundArr[i]} onClick={switchInputWindow}>
            {' '}
            {boundArr[i]}{' '}
          </Button>
          {okButton}
        </li>
      );

      list.push(
        <li key={i * 2 + 1}>
          <Input value={boundNumber[i]} placeholder="UpperInput" />
        </li>
      );
    }

    return <ul className={style.BoundChooseInout}>{list}</ul>;
  }
}

export default BoundChoose;
