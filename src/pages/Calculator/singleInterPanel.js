import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import style from './NormalPanel.less';

class SingleInterPanel extends PureComponent {
  render() {
    const { sendToBack, opClick, handleDelete, clear, numberClick, enableY, enableZ } = this.props;

    return (
      <div>
        <Button id="+" onClick={opClick} className={style.button}>
          {' '}
          +{' '}
        </Button>
        <Button id="-" onClick={opClick} className={style.button}>
          {' '}
          -{' '}
        </Button>
        <Button id="*" onClick={opClick} className={style.button}>
          {' '}
          *{' '}
        </Button>
        <Button id="/" onClick={opClick} className={style.button}>
          {' '}
          /{' '}
        </Button>
        <Button id="(" onClick={opClick} className={style.button}>
          {' '}
          ({' '}
        </Button>
        <Button id=")" onClick={opClick} className={style.button}>
          {' '}
          ){' '}
        </Button>
        <Button id="x" onClick={numberClick} className={style.button}>
          {' '}
          x{' '}
        </Button>
        <Button id="y" disabled={enableY} onClick={numberClick} className={style.button}>
          {' '}
          y{' '}
        </Button>
        <Button id="z" disabled={enableZ} onClick={numberClick} className={style.button}>
          {' '}
          z{' '}
        </Button>
        <Button id="^" onClick={opClick} className={style.button}>
          {' '}
          ^{' '}
        </Button>
        <Button id="=" onClick={sendToBack} className={style.button}>
          {' '}
          ={' '}
        </Button>
        <Button id="<" onClick={handleDelete} className={style.button}>
          {' '}
          <Icon type="left-square-o" />{' '}
        </Button>
        <Button id="clear" onClick={clear} className={style.button}>
          {' '}
          clc{' '}
        </Button>
        <br />
      </div>
    );
  }
}

export default SingleInterPanel;
