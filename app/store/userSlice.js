
import { createSlice, createSelector } from '@reduxjs/toolkit';


const initialState = {
  userRef: null,
  deliveryAddress:[],
  orderRef:null
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUserItem: (state, action) => {
      const newUserRef = action.payload.userRef;
      state.userRef = newUserRef;

  },
  // clear: (state) => {
  //   state.userInfo = [];
  // },
},
})

export const selectUserRef = (state) => state.userInfo.userRef;
export const selectSelf = (state) => state.userInfo;
