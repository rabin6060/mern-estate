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
      },


      deleteUserStart:(state)=>{
        state.loading=true
      },
      deleteUserSuccess:(state)=>{
        state.currentUser=null,
        state.loading=false,
        state.error=null
      },
      deleteUserFailure:(state,action)=>{
        state.loading=false,
        state.error=action.payload
      },

      SignOutUserStart:(state)=>{
        state.loading=true
      },
      SignOutUserSuccess:(state)=>{
        state.currentUser=null,
        state.loading=false,
        state.error=null
      },
      SignOutUserFailure:(state,action)=>{
        state.loading=false,
        state.error=action.payload
      }
    },
  })
export const {signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserStart,updateUserSuccess,
      deleteUserFailure,deleteUserStart,deleteUserSuccess,
    SignOutUserSuccess,SignOutUserFailure,SignOutUserStart} = userSlice.actions
export default userSlice.reducer