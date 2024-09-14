import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get('http://localhost:3001/products'); // Cambia esta URL según corresponda
      set({ products: response.data }); // Accede a los datos de la respuesta con `response.data`
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  createProduct: async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3001/products', newProduct);
      set((state) => ({
        products: [...state.products, response.data]  // Agrega el nuevo producto al estado
      }));
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      return null;
    }
  }
}));

export default useProductStore;
