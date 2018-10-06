export default {
  namespace: 'counterMod',
  state: {
    count: 0,
  },
  effects: {
    *add(_, { put }) {
      yield put({
        type: 'addCount',
      });
    },
    *minus(_, { put }) {
      yield put({
        type: 'minusCount',
      });
    },
    *spin(_, { call, put }) {
      yield call(test);
      yield put({
        type: 'wait',
      });
    },
  },

  reducers: {
    addCount(state) {
      // state = state + 1;
      let { count } = state;
      count += 1;
      return {
        count,
      };
    },
    minusCount(state) {
      let { count } = state;
      count -= 1;
      return {
        count,
      };
    },
    wait(state) {
      return {
        ...state,
      };
    },
  },
};

// function test() {
//   console.log('sending');
//   $.post('http://localhost:8007/Loading', {
//     first: '111',
//   },
//   (data) => {
//     console.log(data);
//   // change back to json
//     let sendBackData = JSON.parse(data);

//   // IDK why this is so magic that I need convert from []byte->string->json
//     sendBackData = JSON.parse(sendBackData);
//     // const { Board, UserPoint, AIPoint, Winner } = sendBackData;
//     console.log(sendBackData);

//     // this.setState({
//     //   map: Board,
//     //   playerPoint: UserPoint,
//     //   AIPoint,
//     //   winner: Winner,
//     // });
//   });
// }
