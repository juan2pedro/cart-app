import { Product } from '../models/product';
import { createAction, props } from '@ngrx/store';

export const add = createAction('add', props<{ product: Product }>());
export const remove = createAction('remove', props<{ id: number }>());
export const total = createAction('total');
