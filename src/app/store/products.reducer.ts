import { createReducer, on } from '@ngrx/store';
import { findAll, load } from './products.action';
const products: any = [];
const initialState = {
  products,
};
export const productsReducer = createReducer(
  initialState,
  on(load, (state, payload) => {
    return {
      products: [...state.products],
    };
  }),
  on(findAll, (state, payload) => {
    return {
      products: [...payload.products],
    };
  })
);
