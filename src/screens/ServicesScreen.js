import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ServicesScreen = () => {
  const services = [
    {
      id: 1,
      title: 'Generator Services',
      icon: 'build-outline',
      description: 'Complete generator solutions including installation, maintenance, repair, testing and commissioning of diesel generators up to 1000kVA.',
      features: [
        'Generator installation & commissioning',
        'Regular maintenance & servicing',
        'Emergency repairs',
        'Load testing & certification'
      ]
    },
    {
      id: 2,
      title: 'Solar Systems',
      icon: 'sunny-outline',
      description: 'Design, installation and maintenance of solar power systems for residential, commercial and industrial applications.',
      features: [
        'Solar panel installation',
        'Battery backup systems',
        'Grid-tied systems',
        'Maintenance & monitoring'
      ]
    },
    {
      id: 3,
      title: 'PLC & Automation',
      icon: 'settings-outline',
      description: 'Advanced PLC programming, InteliLite & DSE configuration, and industrial automation solutions.',
      features: [
        'PLC programming',
        'SCADA systems',
        'Process automation',
        'Control panel design'
      ]
    },
    {
      id: 4,
      title: 'ATS Systems',
      icon: 'swap-horizontal-outline',
      description: 'Design, installation, and maintenance of Automatic Transfer Switch systems for seamless power switching.',
      features: [
        'ATS panel design',
        'Installation & testing',
        'Maintenance contracts',
        'Emergency repairs'
      ]
    },
    {
      id: 5,
      title: 'Electrical Installations',
      icon: 'flash-outline',
      description: 'Complete electrical installation works for residential, commercial and industrial projects.',
      features: [
        'Wiring & cabling',
        'Distribution boards',
        'Lighting systems',
        'Power outlets'
      ]
    },
    {
      id: 6,
      title: 'CCTV & Security',
      icon: 'videocam-outline',
      description: 'CCTV installation, RMS Modbus mapping, rectifier systems, VFD and AVR systems.',
      features: [
        'CCTV installation',
        'Access control',
        'Security alarms',
        'Monitoring systems'
      ]
    },
  ];

  const packages = [
    {
      title: 'Basic Maintenance',
      price: 'From TZS 150,000',
      features: [
        'Generator service check',
        'Electrical safety inspection',
        'Basic troubleshooting',
        '3-month warranty'
      ],
      popular: false
    },
    {
      title: 'Professional Installation',
      price: 'From TZS 500,000',
      features: [
        'Complete generator installation',
        'ATS system setup',
        'Free site inspection',
        '1-year warranty',
        '24/7 emergency support'
      ],
      popular: true
    },
    {
      title: 'Enterprise Solution',
      price: 'Custom Pricing',
      features: [
        'Full electrical system design',
        'PLC programming',
        'Solar power integration',
        'Annual maintenance contract',
        'Priority 24/7 support'
      ],
      popular: false
    }
  ];

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSubtitle}>Professional Electrical Solutions Across Tanzania</Text>
      </View>

      {/* Service Packages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Packages</Text>
        <View style={styles.packagesContainer}>
          {packages.map((pkg, index) => (
            <View key={index} style={[styles.packageCard, pkg.popular && styles.popularPackage]}>
              {pkg.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </View>
              )}
              <Text style={styles.packageTitle}>{pkg.title}</Text>
              <Text style={styles.packagePrice}>{pkg.price}</Text>
              <View style={styles.featuresList}>
                {pkg.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#1a5632" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={[styles.packageButton, pkg.popular && styles.popularButton]}
                onPress={() => makeCall('+255677014740')}
              >
                <Text style={styles.packageButtonText}>
                  {pkg.popular ? 'Get Quote' : 'Book Now'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* All Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Electrical Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <Ionicons name={service.icon} size={30} color="#1a5632" />
              </View>
              <Text style={styles.serviceCardTitle}>{service.title}</Text>
              <Text style={styles.serviceCardDescription}>{service.description}</Text>
              <View style={styles.serviceFeatures}>
                {service.features.slice(0, 2).map((feature, idx) => (
                  <View key={idx} style={styles.serviceFeatureItem}>
                    <Ionicons name="checkmark" size={14} color="#1a5632" />
                    <Text style={styles.serviceFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.serviceButton}
                onPress={() => makeCall('+255682843552')}
              >
                <Text style={styles.serviceButtonText}>Inquire Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Emergency CTA */}
      <View style={styles.emergencySection}>
        <Ionicons name="warning" size={40} color="#fff" />
        <Text style={styles.emergencyTitle}>Need Immediate Service?</Text>
        <Text style={styles.emergencyText}>We provide 24/7 emergency electrical services</Text>
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => makeCall('+255682843552')}
        >
          <Ionicons name="call" size={20} color="#dc3545" />
          <Text style={styles.emergencyButtonText}>EMERGENCY CALL</Text>
        </TouchableOpacity>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a5632',
    marginBottom: 20,
  },
  packagesContainer: {
    marginBottom: 30,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  popularPackage: {
    borderWidth: 2,
    borderColor: '#1a5632',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#1a5632',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5632',
    textAlign: 'center',
    marginBottom: 10,
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    color: '#666',
    flex: 1,
  },
  packageButton: {
    backgroundColor: '#1a5632',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#ff6b35',
  },
  packageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f9f4',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a5632',
    marginBottom: 8,
  },
  serviceCardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    lineHeight: 16,
  },
  serviceFeatures: {
    marginBottom: 15,
  },
  serviceFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceFeatureText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  serviceButton: {
    backgroundColor: '#f0f9f4',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a5632',
  },
  serviceButtonText: {
    color: '#1a5632',
    fontSize: 12,
    fontWeight: '600',
  },
  emergencySection: {
    backgroundColor: '#dc3545',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 5,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
  },
  emergencyButtonText: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ServicesScreen;