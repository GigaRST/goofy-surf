import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  id: string;
  url: string;
  price: number;
};

export interface CartState {
  items: Item[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Aggiunge un prodotto al carrello e aggiorna il prezzo totale
    addItemToCart: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;

      // Controlla se l'articolo è già nel carrello
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        // Se l'articolo non esiste, lo aggiunge
        state.items.push(newItem);
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      }
    },

    // Rimuove un prodotto dal carrello e aggiorna il totale
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Rimuove l'articolo e aggiorna i totali
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },

    // Svuota completamente il carrello
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Esporta le azioni generate automaticamente
export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

// Esporta il reducer per configurare lo store
export default cartSlice.reducer;
