import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    error:null,
    loading:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart:(state)=>{
        state.loading=true
      },
      signInSuccess:(state,action)=>{
        state.currentUser = action.payload,
        state.loading = false
      },
      signInFailure:(state,action)=>{
        state.currentUser = null
        state.loading=false,
        state.error=action.payload
      },
      updateUserStart:(state)=>{
        state.loading = true
      },
      updateUserSuccess:(state,action)=>{
        state.loading=false,
        state.currentUser=action.payload
      },
      updateUserFailure:(state,action)=>{
        state.currentUser=null
        state.loading=false,
        state.error=action.payload
      }
    },
  })
export const {signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserStart,updateUserSuccess} = userSlice.actions
export default userSlice.reducer