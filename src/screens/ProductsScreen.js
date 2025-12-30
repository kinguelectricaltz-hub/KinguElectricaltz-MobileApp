import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProductsScreen = ({ navigation }) => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Diesel Generators',
      description: '10kVA - 1000kVA available. Complete installation included.',
      price: 'TZS 2.5M - 85M',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400'
    },
    {
      id: 2,
      name: 'Solar Power Systems',
      description: 'Complete solar solutions with battery backup.',
      price: 'TZS 800K - 25M',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400'
    },
    {
      id: 3,
      name: 'Genuine Spare Parts',
      description: 'Original parts with warranty. Next-day delivery available.',
      price: 'TZS 50K - 500K',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400'
    }
  ];

  const productCategories = [
    { name: 'Generators', count: '25+ Models', icon: 'flash-outline' },
    { name: 'Solar Systems', count: '15+ Types', icon: 'sunny-outline' },
    { name: 'Spare Parts', count: '100+ Items', icon: 'cog-outline' },
    { name: 'Electrical Panels', count: '30+ Models', icon: 'grid-outline' },
    { name: 'Cables & Wiring', count: '50+ Types', icon: 'pulse-outline' },
    { name: 'Tools & Equipment', count: '40+ Items', icon: 'hammer-outline' },
  ];

  const openWhatsApp = (message) => {
    const url = `https://wa.me/255682843552?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Products</Text>
        <Text style={styles.headerSubtitle}>Quality Electrical Products with Installation Services</Text>
      </View>

      {/* Shop CTA */}
      <TouchableOpacity 
        style={styles.shopBanner}
        onPress={() => navigation.navigate('Shop')}
      >
        <View style={styles.shopBannerContent}>
          <Ionicons name="cart" size={40} color="#fff" />
          <View style={styles.shopBannerText}>
            <Text style={styles.shopBannerTitle}>🛒 Kingu Electrical Shop</Text>
            <Text style={styles.shopBannerSubtitle}>Browse & order directly. Fast delivery across Tanzania!</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Featured Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.featuredProducts}>
          {featuredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image 
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productContent}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <TouchableOpacity 
                  style={styles.productButton}
                  onPress={() => openWhatsApp(`I'm interested in ${product.name}`)}
                >
                  <Text style={styles.productButtonText}>Inquire Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Product Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Categories</Text>
        <View style={styles.categoriesGrid}>
          {productCategories.map((category, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Shop')}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={30} color="#1a5632" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Order Section */}
      <View style={styles.orderSection}>
        <Text style={styles.orderTitle}>Need a Specific Product?</Text>
        <Text style={styles.orderText}>We source and supply any electrical product you need</Text>
        
        <View style={styles.orderOptions}>
          <TouchableOpacity 
            style={styles.orderOption}
            onPress={() => openWhatsApp("Hello! I need help finding a specific electrical product")}
          >
            <Ionicons name="chatbubbles" size={24} color="#1a5632" />
            <Text style={styles.orderOptionText}>Chat for Products</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.orderOption}
            onPress={() => makeCall('+255677014740')}
          >
            <Ionicons name="call" size={24} color="#1a5632" />
            <Text style={styles.orderOptionText}>Call to Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.orderOption}
            onPress={() => navigation.navigate('Shop')}
          >
            <Ionicons name="search" size={24} color="#1a5632" />
            <Text style={styles.orderOptionText}>Browse Catalog</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <Ionicons name="car" size={30} color="#1a5632" />
        <Text style={styles.deliveryTitle}>Fast Delivery Across Tanzania</Text>
        <Text style={styles.deliveryText}>
          • Dar-es-salaam: Same day delivery{'\n'}
          • Arusha: Next day delivery{'\n'}
          • Major cities: 1-2 days{'\n'}
          • Nationwide: 2-5 days
        </Text>
      </View>

      {/* WhatsApp Quick Order */}
      <View style={styles.whatsappSection}>
        <Ionicons name="logo-whatsapp" size={40} color="#25D366" />
        <Text style={styles.whatsappTitle}>Quick Order via WhatsApp</Text>
        <Text style={styles.whatsappText}>Send us product photos or descriptions for instant quotes</Text>
        
        <View style={styles.whatsappButtons}>
          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={() => openWhatsApp("Hi! I want to order generator spare parts")}
          >
            <Text style={styles.whatsappButtonText}>Order Spare Parts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={() => openWhatsApp("Hi! I need a quote for a solar system")}
          >
            <Text style={styles.whatsappButtonText}>Get Solar Quote</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  },
  shopBanner: {
    backgroundColor: '#1a5632',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  shopBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shopBannerText: {
    flex: 1,
    marginHorizontal: 15,
  },
  shopBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  shopBannerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 20,
  },
  featuredProducts: {
    marginBottom: 30,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productContent: {
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 15,
  },
  productButton: {
    backgroundColor: '#1a5632',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  productButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f9f4',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a5632',
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  orderSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1a5632',
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
    textAlign: 'center',
    marginBottom: 10,
  },
  orderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderOption: {
    alignItems: 'center',
    flex: 1,
  },
  orderOptionText: {
    fontSize: 12,
    color: '#1a5632',
    marginTop: 5,
    textAlign: 'center',
  },
  deliveryInfo: {
    backgroundColor: '#f0f9f4',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a5632',
    marginTop: 15,
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  whatsappSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  whatsappTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
    marginTop: 15,
    marginBottom: 10,
  },
  whatsappText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  whatsappButtons: {
    width: '100%',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductsScreen;