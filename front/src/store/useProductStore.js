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
  },
  
editProduct: async (id, updatedProduct) => {
  try {
    const response = await axios.put(`http://localhost:3001/products/${id}`, updatedProduct);
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? response.data : product
      ),
    }));
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
},
deleteProduct: async (id) => {
  try {
    await axios.delete(`http://localhost:3001/products/${id}`);
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  } catch (error) {
    console.error("Error deleting product:", error);
  }
},

}));


export default useProductStore;
