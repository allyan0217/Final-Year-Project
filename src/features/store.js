import { configureStore } from '@reduxjs/toolkit'
import BasketManagement from './slice/BasketManagement'
import userManagement from './slice/userManagement'
export const store = configureStore({
  reducer:{
    Basket:BasketManagement,
    User:userManagement
}
})