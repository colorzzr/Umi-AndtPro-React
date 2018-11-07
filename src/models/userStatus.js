export default {
  namespace: 'userStatus',

  state: {},

  effects: {},
  reducers: {
    saveUser(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
