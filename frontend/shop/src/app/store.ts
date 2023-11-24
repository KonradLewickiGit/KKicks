import { configureStore } from '@reduxjs/toolkit'
//import orderSliceReducer from '../features/orderSlice'
import searchBarSliceReducer from '../features/searchBarSlice'
import { add } from '../features/orderSlice'
export const store = configureStore({
  reducer: {
   // address: addressSlice
    //searchBar: searchBarSliceReducer,
   // order: orderSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
