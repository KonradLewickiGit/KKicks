import { configureStore } from '@reduxjs/toolkit'
//import orderSliceReducer from '../features/orderSlice'
import searchBarSliceReducer from '../features/searchBarSlice'

export const store = configureStore({
  reducer: {
    searchBar: searchBarSliceReducer,
   // order: orderSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
