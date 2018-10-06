import React, { PureComponent } from 'react';
import { Card, Collapse } from 'antd';
import myImg from '../../assets/Personal Info/Avtar.jpg';
import styles from './PersonInfo.less';
import CollapseBox from './CollapseBox';
import nonProData from './Non-Professional Data';
import proData from './Professional Data';
import acaData from './Academic Career';

const { Panel } = Collapse;

class PersonalInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.background}>
        <h1> Zhan Zhiren </h1>
        <div className={styles.headInfo}>
          <h1> About Myself </h1>
          <div className={styles.shortInfo}>
            <Card className={styles.shortInfoCard}>
              <p> Phone Number: 647-936-4713</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> Email: colorzzr@gmail.com</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> School: University of Toronto</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> Grade: Third Year Electrical and Computer Engineer</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> Language: C, C++, Go, Javascript, Swift</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p>
                {' '}
                GitHub: <a href="https://github.com/colorzzr">https://github.com/colorzzr</a>
              </p>
            </Card>
          </div>

          <div className={styles.avtarImg}>
            <img src={myImg} alt="Personal img" />
          </div>
        </div>

        <div className={styles.mainContent}>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={<h1 className={styles.collapseHeader}>Non-Profossional</h1>} key="1">
              <CollapseBox data={nonProData} />
            </Panel>
            <Panel
              header={<h1 className={styles.collapseHeader}>Professional Experience</h1>}
              key="2"
            >
              <CollapseBox data={proData} />
            </Panel>
            <Panel header={<h1 className={styles.collapseHeader}>Academic Career</h1>} key="3">
              <CollapseBox data={acaData} />
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
