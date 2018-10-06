import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import style from './GeneralMenu.less';

const { SubMenu } = Menu;

class GeneralMenu extends PureComponent {
  render() {
    const { modeChange } = this.props;
    return (
      <Menu
        style={{ height: '100%' }}
        defaultSelectedKeys={['0']}
        mode="inline"
        onSelect={modeChange}
      >
        <SubMenu
          key="Normal Calculation"
          title={<span className={style.menuName}>Normal Calculation</span>}
          className={style.SiderMenus}
        >
          <Menu.Item key={0}>
            <span className={style.MenuItem}>Real</span>
          </Menu.Item>
          <Menu.Item key={1}>
            <span className={style.MenuItem}>Imaginary</span>
          </Menu.Item>
          <Menu.Item key={2}>
            <span className={style.MenuItem}>Absolute</span>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="Higher Order"
          title={<span className={style.menuName}>Higher Order(Not Finish)</span>}
          className={style.SiderMenus}
        >
          <Menu.Item key={3}>
            <span className={style.MenuItem}>Higher Calc</span>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="Integral Calculation"
          title={<span className={style.menuName}>Integral Calculation(Not Finish)</span>}
          className={style.SiderMenus}
        >
          <Menu.Item key={4}>
            <span className={style.MenuItem}>single</span>
          </Menu.Item>
          <Menu.Item key={5}>
            <span className={style.MenuItem}>double</span>
          </Menu.Item>
          <Menu.Item key={6}>
            <span className={style.MenuItem}>triple</span>
          </Menu.Item>
          <Menu.Item key={7}>
            <span className={style.MenuItem}>quadruple</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default GeneralMenu;
