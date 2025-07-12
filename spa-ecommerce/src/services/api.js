const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Products API
  async getProducts(queryString = '') {
  const endpoint = queryString ? `/products?${queryString}` : '/products';
  const result = await this.request(endpoint);
  return result; 
}

  async getProduct(id) {
    return this.request(`/products/single/${id}`);
  }

  // Cart API
  async getCart(sessionId) {
    try {
      return await this.request(`/cart/get/${sessionId}`);
    } catch (error) {
      return { items: [], totalAmount: 0 }; 
    }
  }

  async addToCart(sessionId, productId, quantity = 1, price) {
    return this.request(`/cart/add/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, price }),
    });
  }

  async updateCartItem(sessionId, productId, quantity) {
    return this.request(`/cart/update/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  // Orders API
  async createOrder(sessionId, customerInfo) {
    return this.request('/orders/create', {
      method: 'POST',
      body: JSON.stringify({ sessionId, customerInfo }),
    });
  }
}

export default new ApiService();