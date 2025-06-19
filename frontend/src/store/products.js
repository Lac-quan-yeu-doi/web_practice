import { create } from "zustand";

export const useProductsStore = create((set) => ({
    // Zustand state
    products: [],  // Initial state => Initialize products as an empty array
    
    // Actions to manipulate the state
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {  
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success: false, message: 'Please fill in all fields'}
        }
        // fetch to create a request to products database
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        // In file controller/product.controller.js, when created a product, the response is a JSON object with the field data => so it should be responsed.data
        const response = await res.json();
        set((state) => ({ products: [...state.products, response.data] }));
        return { success: true, message: 'Product created successfully'};
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products');
        const response = await res.json();
        set({ products: response.data });
    },
    deleteProduct: async (productID) =>{
        const res = await fetch('/api/products/' + productID, {
            method: 'DELETE'
        });
        const response = await res.json();
        if (!response.success) {
            return { success: false, message: response.message };
        }
        // after function "fetch", backend has deleted the product, but frontend still has the product => need to update the state => use function "set"
        set((state) => ({
            products: state.products.filter((product) => product._id !== productID)
        }));
        return { success: true, message: response.message };
    },
    updateProduct: async (productID, updateProduct) => {
        const res = await fetch(`/api/products/${productID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateProduct)
        });
        const response = await res.json();
        if (!response.success) {
            return { success: false, message: response.message };
        }

        // update UI state
        console.log('response.udpate: asfhashfkek', );
        set((state) => ({
            products: state.products.map((product) => product._id === productID ? response.update : product)
        }))
        return { success: true, message: response.message};
    }
}));