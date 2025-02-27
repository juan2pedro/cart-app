import { Product } from '../models/product';

export const add = createAction('add', props<{ product: Product }>);
