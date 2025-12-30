import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ShopScreen from './src/screens/ShopScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Services') {
                iconName = focused ? 'construct' : 'construct-outline';
              } else if (route.name === 'Products') {
                iconName = focused ? 'cube' : 'cube-outline';
              } else if (route.name === 'Shop') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Contact') {
                iconName = focused ? 'call' : 'call-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1a5632',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#1a5632',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Kingu Electrical' }} />
          <Tab.Screen name="Services" component={ServicesScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="Contact" component={ContactScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}