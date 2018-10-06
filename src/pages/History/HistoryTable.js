import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';

const Parse = require('parse/node');

Parse.initialize('Calculator', 'UpdKbelU7zvtsCCW', 'jQAr0Xqhbkw45mSW');
// change URL to server ip not localhost
Parse.serverURL = 'http://18.223.112.55:8080/v1';
// Parse.serverURL = 'http://127.0.0.1:8080/v1';

Parse.masterKey = 'jQAr0Xqhbkw45mSW';

const cols = {
  count: { min: 0 },
  date: {},
};

const columns = [
  {
    title: 'Answer',
    dataIndex: 'answerStr',
    key: 'answerStr',
  },
  {
    title: 'Error Massage',
    dataIndex: 'errorMsg',
    key: 'errorMsg',
  },
  {
    title: 'Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Operation Mode',
    dataIndex: 'operationMode',
    key: 'operationMode',
  },
];

class HistoryTable extends PureComponent {
  constructor(props) {
    super(props);

    // check whether loging
    const { login } = this.props;
    const { status } = login;
    if (!status) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/needLogin',
      });
    }

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      page: 1,
      pageSize: 10,
      dataCount: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { page, pageSize } = this.state;

    // get the total count
    dispatch({
      type: 'historyDatas/count',
    });

    dispatch({
      type: 'historyDatas/fetchFrequence',
    });

    dispatch({
      type: 'historyDatas/fetch',
      payload: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    });
  }

  handleChange(pagination, fliter, sorter) {
    const { current } = pagination;
    const { dispatch } = this.props;
    console.log(pagination, fliter, sorter);

    const { pageSize } = this.state;
    dispatch({
      type: 'historyDatas/fetch',
      payload: {
        skip: (current - 1) * pageSize,
        limit: pageSize,
      },
    });

    this.setState({
      page: current,
    });
  }

  test() {
    console.log(this.state);
    const { historyDatas } = this.props;

    console.log(historyDatas);
  }

  render() {
    const { historyDatas, loading } = this.props;
    const { historyData, count, frequenceData } = historyDatas;
    const { page, pageSize } = this.state;

    console.log(historyData);

    // console.log(loading.models.historyDatas);
    const tabelLoading = loading.models.historyDatas;

    // constructe the page footer
    const paginationProps = {
      current: page,
      pageSize,
      showQuickJumper: true,
      total: count,
      showTotal: total => `共 ${total} 条`,
    };

    return (
      <div>
        <h1>HHHISTORY</h1>
        <Table
          columns={columns}
          loading={tabelLoading}
          dataSource={historyData}
          pagination={paginationProps}
          onChange={this.handleChange}
        />
        <h1 style={{ align: 'center' }}> 你每天的测试次数 </h1>
        <Chart height={400} data={frequenceData} scale={cols} forceFit>
          <Axis name="date" />
          <Axis name="count" />
          <Tooltip crosshairs={{ type: 'y' }} />
          <Geom type="line" position="date*count" size={2} />
          <Geom
            type="point"
            position="date*count"
            size={4}
            shape="circle"
            style={{ stroke: '#fff', lineWidth: 1 }}
          />
        </Chart>
      </div>
    );
  }
}

export default connect(({ historyDatas, login, loading }) => ({
  historyDatas,
  login,
  loading,
}))(HistoryTable);
