import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import style from './NormalPanel.less';

class NormalPanel extends PureComponent {
  render() {
    const { sendToBack, opClick, handleDelete, numberClick, clear, imagenryEnable } = this.props;
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
        <Button id="=" onClick={sendToBack} className={style.button}>
          {' '}
          ={' '}
        </Button>
        <Button id="<" onClick={handleDelete} className={style.button}>
          {' '}
          <Icon type="left-square-o" />{' '}
        </Button>
        <Button id="^" onClick={opClick} className={style.button}>
          {' '}
          ^{' '}
        </Button>
        <Button id="exp(" onClick={opClick} className={style.button}>
          {' '}
          exp{' '}
        </Button>
        <Button id="i" onClick={numberClick} disabled={imagenryEnable} className={style.button}>
          {' '}
          i{' '}
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

export default NormalPanel;
