import { getMonthStr } from '../utils/utils';

const Parse = require('parse/node');

// Parse.initialize('Calculator', 'UpdKbelU7zvtsCCW', 'jQAr0Xqhbkw45mSW');
// // change URL to server ip not localhost
// Parse.serverURL = 'http://18.223.112.55:8080/v1';
// // Parse.serverURL = 'http://127.0.0.1:8080/v1';

// Parse.masterKey = 'jQAr0Xqhbkw45mSW';

export default {
  namespace: 'historyDatas',
  state: {
    historyData: [],
    count: 0,
    frequenceData: [],
  },
  effects: {
    *count(_, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      const count = yield query.count();
      yield put({
        type: 'save',
        payload: { count },
      });
    },
    *fetch({ payload }, { put }) {
      const returnPack = Parse.Object.extend('returnPack');
      const query = new Parse.Query(returnPack);
      const { skip, limit } = payload;

      query.descending('createdAt');
      query.limit(limit);
      query.skip(skip);

      const response = yield query.find();

      yield put({
        type: 'saveData',
        payload: response,
      });
    },

    *fetchFrequence(_, { put }) {
      // const returnPack = Parse.Object.extend('returnPack');

      // let pipeline = {};
      // // ----------------------------------------voltage pipelining-------------------------------
      // pipeline = {
      //   // group: {
      //   //   date: 'date',
      //   //   count: { sum: 1 },
      //   // },
      //   group: { objectId: '$date' }
      // };
      // const dateQ = new Parse.Query(returnPack);
      // const frequenceData = yield dateQ.aggregate(pipeline);

      // yield dateQ.aggregate(pipeline).then((results) => {
      //   console.log(result);
      //   done();
      // })
      // .catch(function(error) {
      //   console.log(error);
      //   // There was an error.
      // });

      //------------------------------------------------------
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();

      let str = `${year}-${getMonthStr(month)}-${day}`;

      const dateArr = [str];
      // take the current five days
      for (let i = 0; i < 6; i += 1) {
        if (day === 1) {
          // move to last year
          if (month === 1) {
            day = 31;
            month = 12;
            year -= 1;
          }
          // SORTed based on month
          else if (month === 3) {
            day = 28;
            month = 2;
          }
          // big month
          else if (
            month === 2 ||
            month === 4 ||
            month === 6 ||
            month === 8 ||
            month === 9 ||
            month === 12
          ) {
            day = 31;
            month -= 1;
          } else {
            day = 30;
            month -= 1;
          }
        }
        // else day minus 1
        else {
          day -= 1;
        }
        str = `${year}-${getMonthStr(month)}-${day}`;
        dateArr.push(str);
      }

      console.log(dateArr);

      const frequenceData = [];
      const query = new Parse.Query('returnPack');
      for (let i = 0; i < dateArr.length; i += 1) {
        query.equalTo('date', dateArr[i]);
        const cc = yield query.count();
        frequenceData.push({
          date: dateArr[i],
          count: cc,
        });
      }

      yield put({
        type: 'save',
        payload: { frequenceData },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, { payload }) {
      const historyData = payload.map(v => {
        const answerStr = v.get('answer');
        const errorMsg = v.get('errorMsg');
        const createdAt = new Date(v.get('createdAt'));
        const date = v.get('date');
        const operationModeIndex = v.get('operationMode');

        // sort mode
        let operationMode;
        if (operationModeIndex === 0) {
          operationMode = 'Normal Mode';
        } else if (operationModeIndex === 1) {
          operationMode = 'Imaginery Mode';
        } else if (operationModeIndex === 2) {
          operationMode = 'Absolute Mode';
        } else if (operationModeIndex === 3) {
          operationMode = 'Higher Order Mode';
        } else {
          operationMode = 'Single Integraal Mode';
        }
        // using create at to generate unique keys
        const key = createdAt.getTime();

        return {
          answerStr,
          errorMsg,
          createdAt: date,
          operationMode,
          key,
        };
      });

      return {
        ...state,
        historyData,
      };
    },
  },
};
