import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  Modal,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ShopScreen = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    'All',
    'Generators',
    'Solar Systems',
    'Spare Parts',
    'Electrical Panels',
    'Tools',
    'Cables'
  ];

  const products = [
    {
      id: 1,
      name: 'Diesel Generator 50kVA',
      category: 'Generators',
      price: 'TZS 8,500,000',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
      inStock: true,
      rating: 4.5,
      description: 'Complete diesel generator set with automatic start, soundproof canopy, and control panel.'
    },
    {
      id: 2,
      name: 'Solar Panel 300W',
      category: 'Solar Systems',
      price: 'TZS 250,000',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      inStock: true,
      rating: 4.7,
      description: 'High-efficiency monocrystalline solar panel with 25-year performance warranty.'
    },
    {
      id: 3,
      name: 'Generator Alternator',
      category: 'Spare Parts',
      price: 'TZS 450,000',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
      inStock: true,
      rating: 4.3,
      description: 'Genuine alternator for diesel generators, compatible with multiple models.'
    },
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const openWhatsAppOrder = (product) => {
    const message = `I want to order: ${product.name}\nPrice: ${product.price}\nPlease contact me for details.`;
    Linking.openURL(`https://wa.me/255682843552?text=${encodeURIComponent(message)}`);
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const CartModal = () => (
    <Modal
      visible={showCart}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Cart</Text>
            <TouchableOpacity onPress={() => setShowCart(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <Ionicons name="cart-outline" size={60} color="#ccc" />
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          ) : (
            <>
              <ScrollView style={styles.cartItems}>
                {cart.map((item, index) => (
                  <View key={index} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemPrice}>{item.price}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(index)}>
                      <Ionicons name="trash" size={20} color="#dc3545" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={() => {
                  const message = `Order Summary:\n${cart.map(item => `- ${item.name}: ${item.price}`).join('\n')}\n\nTotal Items: ${cart.length}`;
                  Linking.openURL(`https://wa.me/255682843552?text=${encodeURIComponent(message)}`);
                }}
              >
                <Text style={styles.checkoutButtonText}>Checkout via WhatsApp</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  const ProductModal = () => (
    <Modal
      visible={!!selectedProduct}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Product Details</Text>
            <TouchableOpacity onPress={() => setSelectedProduct(null)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {selectedProduct && (
            <ScrollView style={styles.productDetails}>
              <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />
              <Text style={styles.detailName}>{selectedProduct.name}</Text>
              <View style={styles.detailRating}>
                <Ionicons name="star" size={16} color="#ffc107" />
                <Text style={styles.detailRatingText}>{selectedProduct.rating}</Text>
                <Text style={styles.detailCategory}>{selectedProduct.category}</Text>
              </View>
              <Text style={styles.detailPrice}>{selectedProduct.price}</Text>
              <Text style={styles.detailDescription}>{selectedProduct.description}</Text>
              
              <View style={styles.detailActions}>
                <TouchableOpacity 
                  style={styles.detailButton}
                  onPress={() => openWhatsAppOrder(selectedProduct)}
                >
                  <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                  <Text style={styles.detailButtonText}>Order Now</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.detailButton, styles.callButton]}
                  onPress={() => Linking.openURL('tel:+255677014740')}
                >
                  <Ionicons name="call" size={20} color="#fff" />
                  <Text style={styles.detailButtonText}>Call for Info</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kingu Electrical Shop</Text>
        <Text style={styles.headerSubtitle}>Electrical Products & Equipment</Text>
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Cart Button */}
      <TouchableOpacity style={styles.cartButton} onPress={() => setShowCart(true)}>
        <Ionicons name="cart" size={24} color="#fff" />
        {cart.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.activeCategoryTab
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryTabText,
              selectedCategory === category && styles.activeCategoryTabText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => openProductDetails(product)}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <View style={styles.productRating}>
                  <Ionicons name="star" size={14} color="#ffc107" />
                  <Text style={styles.productRatingText}>{product.rating}</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.productActions}>
                  <TouchableOpacity 
                    style={styles.productButton}
                    onPress={() => openWhatsAppOrder(product)}
                  >
                    <Text style={styles.productButtonText}>Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cartAddButton}
                    onPress={() => addToCart(product)}
                  >
                    <Ionicons name="cart-outline" size={16} color="#1a5632" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Quick Order Section */}
      <View style={styles.quickOrder}>
        <Text style={styles.quickOrderTitle}>Need Help Ordering?</Text>
        <Text style={styles.quickOrderText}>Our team is ready to assist you</Text>
        
        <View style={styles.quickOrderButtons}>
          <TouchableOpacity 
            style={styles.quickOrderButton}
            onPress={() => Linking.openURL('https://wa.me/255682843552')}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.quickOrderButtonText}>Chat on WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickOrderButton, styles.callButton]}
            onPress={() => Linking.openURL('tel:+255677014740')}
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.quickOrderButtonText}>Call +255 677 014 740</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <CartModal />
      <ProductModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a5632',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  cartButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ff6b35',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 100,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#dc3545',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  activeCategoryTab: {
    backgroundColor: '#1a5632',
  },
  categoryTabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  productsContainer: {
    flex: 1,
    padding: 10,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 10,
  },
  productCategory: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    height: 40,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  productRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 10,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productButton: {
    backgroundColor: '#1a5632',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  productButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  cartAddButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f9f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickOrder: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickOrderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
    textAlign: 'center',
    marginBottom: 10,
  },
  quickOrderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  quickOrderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickOrderButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: '#1a5632',
  },
  quickOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
  },
  emptyCart: {
    padding: 40,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  cartItems: {
    maxHeight: 400,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#1a5632',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#25D366',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDetails: {
    padding: 20,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 10,
  },
  detailRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailRatingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    marginRight: 15,
  },
  detailCategory: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f9f4',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  detailPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 20,
  },
  detailDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ShopScreen;