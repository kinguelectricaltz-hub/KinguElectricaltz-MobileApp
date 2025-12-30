import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [promoActive, setPromoActive] = useState(true);

  const services = [
    { id: 1, name: 'Generator Services', icon: 'build-outline' },
    { id: 2, name: 'Solar Systems', icon: 'sunny-outline' },
    { id: 3, name: 'PLC & Automation', icon: 'settings-outline' },
    { id: 4, name: 'ATS Systems', icon: 'swap-horizontal-outline' },
    { id: 5, name: 'Electrical Installations', icon: 'flash-outline' },
    { id: 6, name: 'CCTV & Security', icon: 'videocam-outline' },
  ];

  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '24/7', label: 'Emergency Support' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '15+', label: 'Years Experience' },
  ];

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/255682843552');
  };

  const openEmail = () => {
    Linking.openURL('mailto:Kinguelectricaltz@gmail.com');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="flash" size={60} color="#fff" />
          <Text style={styles.companyName}>Kingu Electrical</Text>
          <Text style={styles.tagline}>Quality Electrical Services with Professional Experience</Text>
        </View>

        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
            <Text style={styles.contactText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={() => makeCall('+255677014740')}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.contactText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
            <Ionicons name="mail" size={20} color="#fff" />
            <Text style={styles.contactText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo Banner */}
      {promoActive && (
        <View style={styles.promoBanner}>
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>LIMITED OFFER</Text>
          </View>
          <Text style={styles.promoTitle}>⚡ Get 15% Off First Generator Service</Text>
          <Text style={styles.promoCode}>Use code: KINGU15</Text>
          <TouchableOpacity style={styles.promoButton} onPress={() => makeCall('+255677014740')}>
            <Text style={styles.promoButtonText}>Claim Offer</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Trusted Electrical Experts in Tanzania</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Services */}
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('Services')}
            >
              <Ionicons name={service.icon} size={30} color="#1a5632" />
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Emergency CTA */}
      <View style={styles.emergencyContainer}>
        <Ionicons name="warning" size={40} color="#fff" />
        <Text style={styles.emergencyTitle}>Electrical Emergency?</Text>
        <Text style={styles.emergencyText}>24/7 Emergency Service Available</Text>
        <TouchableOpacity style={styles.emergencyButton} onPress={() => makeCall('+255682843552')}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.emergencyButtonText}>CALL NOW: +255 682 843 552</Text>
        </TouchableOpacity>
        <Text style={styles.responseTime}>Response within 2 hours in Dar-es-salaam & Arusha</Text>
      </View>

      {/* Kingu Shop CTA */}
      <View style={styles.shopContainer}>
        <Text style={styles.shopTitle}>🛒 Shop Electrical Products</Text>
        <Text style={styles.shopText}>Browse & order directly. Fast delivery across Tanzania!</Text>
        <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Shop')}>
          <Ionicons name="cart" size={20} color="#1a5632" />
          <Text style={styles.shopButtonText}>Open Kingu Electrical Shop</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Services')}>
            <Ionicons name="document-text" size={30} color="#1a5632" />
            <Text style={styles.actionText}>Get Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Products')}>
            <Ionicons name="cube" size={30} color="#1a5632" />
            <Text style={styles.actionText}>View Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Contact')}>
            <Ionicons name="calendar" size={30} color="#1a5632" />
            <Text style={styles.actionText}>Book Inspection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={openWhatsApp}>
            <Ionicons name="chatbubbles" size={30} color="#1a5632" />
            <Text style={styles.actionText}>Live Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating WhatsApp Button */}
      <TouchableOpacity style={styles.whatsappFloat} onPress={openWhatsApp}>
        <Ionicons name="logo-whatsapp" size={30} color="#fff" />
      </TouchableOpacity>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 5,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  contactButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  promoBanner: {
    backgroundColor: '#ff6b35',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  promoBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  promoBadgeText: {
    color: '#ff6b35',
    fontWeight: 'bold',
    fontSize: 12,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  promoCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  promoButtonText: {
    color: '#ff6b35',
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a5632',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  servicesContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
  },
  serviceName: {
    marginTop: 10,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  emergencyContainer: {
    backgroundColor: '#dc3545',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  emergencyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 10,
  },
  emergencyButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  emergencyButtonText: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  responseTime: {
    color: '#fff',
    fontSize: 12,
    marginTop: 10,
  },
  shopContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1a5632',
    alignItems: 'center',
  },
  shopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 10,
  },
  shopText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  shopButton: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1a5632',
  },
  shopButtonText: {
    color: '#1a5632',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  actionsContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
  },
  actionText: {
    marginTop: 10,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  whatsappFloat: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25D366',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default HomeScreen;