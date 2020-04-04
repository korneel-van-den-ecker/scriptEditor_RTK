import { createSlice } from '@reduxjs/toolkit';
import axois from  'axios'
import Axios from 'axios';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    test:[]
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    tester:(state,action)=>{
      console.log(`test: ${action.payload}`)
      state.test += action.payload
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {tester, increment, decrement, incrementByAmount } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const testerAsync = () => dispatch => {
  Axios.get('http://localhost:8050/MCP/v1/files?location=Scripts?Pattern=*.lua')
  .then((resp)=>{
    dispatch(tester(resp.data))
  })

};

export const incrementAsync = amount => dispatch => { 
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;
export const selectData = state => state.counter.test;

export default slice.reducer;
