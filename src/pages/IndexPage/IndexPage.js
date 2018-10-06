import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';
import styles from './IndexPage.css';

// document.title = "dfsdfsdfsd";

class IndexPage extends PureComponent {
  componentWillMount() {
    // eslint-disable-next-line
    document.title = 'Colorful Web';
  }

  render() {
    // const { location } = this.props;

    const header = "Welcome to Color's Web Page";

    return (
      <div>
        <div className={styles.CarouseHolder}>
          <Carousel autoplay className={styles.indexPage}>
            <div>
              <h3 className={styles.CarouselWord}>{header}</h3>
            </div>
            <div>
              <h3 className={styles.CarouselWord}>This is test server</h3>
            </div>
            <div>
              <h3 className={styles.CarouselWord}>We work in the dark to serve the light</h3>
            </div>
            <div>
              <h1 className={styles.CarouselWord}>NOW GO BACK TO STUDY!</h1>
            </div>
          </Carousel>
        </div>
        <div>
          <h1> Under-Construction </h1>
          <h3> Persional Page </h3>
          <h3> Calculator Higher Order </h3>
          <h3> Tube Game Page </h3>
          <h3> Login Cookie </h3>
          <h3> Main Layout </h3>

          <br />
          <h1> Done </h1>
          <h3> History Page </h3>
          <h3> Reversi Game </h3>
        </div>
      </div>
    );
  }
}

export default connect()(IndexPage);
