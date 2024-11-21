import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  name: string;
  price: number;
  
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((_, index) => index !== action.payload);
    },
    editProduct: (state, action: PayloadAction<{ index: number; product: Product }>) => {
      const { index, product } = action.payload;
      state.products[index] = product;
    },
  },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;
