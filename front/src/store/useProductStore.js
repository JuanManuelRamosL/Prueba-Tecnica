import { create } from "zustand";
import axios from "axios";
// Definimos el estado global para los productos usando Zustand
const useProductStore = create((set,get) => ({
  // Estado inicial para almacenar los productos y los productos filtrados
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  apoyo:false,
  setApoyo: (value) => set({ apoyo: value }),

  // Método para obtener todos los productos desde la API
  fetchProducts: async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      set({ products: response.data }); // Accede a los datos de la respuesta con `response.data`
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // Método para obtener un producto por su ID
  fetchProductById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      set({ selectedProduct: response.data }); // Actualiza el estado con el producto seleccionado
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  },

  // Método para crear un nuevo producto
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
  
// Método para editar un producto existente
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

// Método para eliminar un producto por su ID
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

// Método para establecer un término de búsqueda y filtrar productos
setSearchTerm: (term) => {
  const { products } = get();
  set({ searchTerm: term });

  if (term) {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    set({ filteredProducts: filtered }); // Actualiza los productos filtrados
  } else {
    set({ filteredProducts: products }); // Si no hay búsqueda, muestra todos los productos
  }
},
}));


export default useProductStore;
