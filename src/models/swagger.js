import { fetch } from '../services/swagger';

export default {
  namespace: 'swagger',
  state: {
    apiData: {},
  },
  reducers: {
    'reload'(state, { payload }) {
      return { ...state, apiData: payload } ;
    },
  },
  effects: {
    * fetch({ payload }, { call, put }){
      const datas = yield call(fetch, payload);
      yield put({
        type: 'reload',
        payload: datas
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const reg = new RegExp('/[\\s\\S]*');
        if (reg.test(pathname)) {
          dispatch({ type: 'fetch', payload: {} });
        }
      });
    },
  },
}
