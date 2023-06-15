import * as React from 'react';
import { View, Text, SafeAreaView, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Login';
import Registration from './registration';
import OTP from './OTP';
import CustomerRegister from '../Customer/CustomerRegister'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Splash
import SplashScreen from '../MainRoutes/SplashScreen';
// welcome Landing
import WelcomeLandingPage from './WelcomeLandingPage';
import TechnicianRegister from './TechRegistration';
import ConsumerForgetPage from './ConsumerForgetPage';
import ConsumerChangePwd from './ConsumerChangePwd';
import ConsumerChangePwdSuccess from './ConsumerChangePwdSuccess';
import TechnicianPendingApprove from './TechnicianPendingApprove';
//Home Page Consumer
import HomePageConsumer from './HomePageConsumer';
import SettingsPageConsumer from '../Customer/SettingsPageConsumer';
//consumer create request
import ConsumerCreateServicePage from '../Customer/CreateServiceRequest/ConsumerCreateServicePage';
import ConsumerDetailsservice from '../Customer/CreateServiceRequest/ConsumerDetailsservice';
import ConsumerConfirmservice from '../Customer/CreateServiceRequest/ConsumerConfirmservice';

//Home Page Technician
import HomepageTechnician from './HomepageTechnician';
import TechnicianAcceptrReject from './TechnicianAcceptrReject';
import TechOpenScreen from './TechOpenScreen';
import SettingsPageTechnician from '../Technician/SettingsPageTechnician';
// tracking botom tab

import Trackservicerequest from '../Technician/TrackserviceRequest';
import TrackServiceRequestlist from '../Customer/TrackServiceRequestlist';
import TrackserviceRequestproduct from '../Customer/TrackserviceRequestproduct';

// Language changes path
import '../constants/DCSLocalize';
import TechPayment from '../Technician/TechPayment';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "red" }}>
      <Text>Home!</Text>
    </View>
  );
}
function TrackScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }}>
      <Text>TrackScreen!</Text>
    </View>
  );
}
function EmptyScreen() {
  return (
    <View >
    </View>
  );
}

function PaymentScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }}>
      <Text>Settings!</Text>
    </View>
  );
}


// Home Page Bottom Consumer
const Homemain = createNativeStackNavigator();
function Homestack() {
  return (
    <Homemain.Navigator screenOptions={{ headerShown: false }}>
      <Homemain.Screen name='HomePageConsumer' component={HomePageConsumer} />
    </Homemain.Navigator>

  );

}

const Trackmain = createNativeStackNavigator();
function ConsumerTrackScreenStack() {
  return (
    <Trackmain.Navigator screenOptions={{ headerShown: false }}>
      <Trackmain.Screen name='TrackServiceRequestlist' component={TrackServiceRequestlist} />
      <Trackmain.Screen name="TrackserviceRequestproduct" component={TrackserviceRequestproduct} />
      <Trackmain.Screen name='ConsumerCreateServicePage' component={ConsumerCreateServicePage} />
      <Trackmain.Screen name='ConsumerDetailsservice' component={ConsumerDetailsservice} />
      <Trackmain.Screen name='ConsumerConfirmservice' component={ConsumerConfirmservice} />
      <Trackmain.Screen name='Trackservicerequest' component={Trackservicerequest} />
    </Trackmain.Navigator>

  );

}

const Settings = createNativeStackNavigator();
function Settingstack() {
  return (
    <Settings.Navigator screenOptions={{ headerShown: false }}>
      <Settings.Screen name='SettingsPageConsumer' component={SettingsPageConsumer} options={{ headerShown: false }} />
    </Settings.Navigator>
  );
}

// Home Page Bottom Technician
const HomemainTechnician = createNativeStackNavigator();
function TechnicianHomestack() {
  return (
    <HomemainTechnician.Navigator screenOptions={{ headerShown: false }}>
      <HomemainTechnician.Screen name='HomepageTechnician' component={HomepageTechnician} />
    </HomemainTechnician.Navigator>
  );
}

const TrackmainTechnician = createNativeStackNavigator();
function TechnicianTrackScreenStack() {
  return (
    <TrackmainTechnician.Navigator screenOptions={{ headerShown: false }}>
      <HomemainTechnician.Screen name='TechOpenScreen' component={TechOpenScreen} />
      <HomemainTechnician.Screen name='TechnicianAcceptrReject' component={TechnicianAcceptrReject} />
    </TrackmainTechnician.Navigator>
  );

}
const PaymentTechnician = createNativeStackNavigator();
function PaymentScreenStack() {
  return (
    <PaymentTechnician.Navigator screenOptions={{ headerShown: false }}>
      <PaymentTechnician.Screen name="TechPayment" component={TechPayment} />
    </PaymentTechnician.Navigator>
  );
}

const SettingsTechnician = createNativeStackNavigator();
function TechnicianSettingstack() {
  return (
    <SettingsTechnician.Navigator screenOptions={{ headerShown: false }}>
      <Settings.Screen name='SettingsPageTechnician' component={SettingsPageTechnician} options={{ headerShown: false }} />
    </SettingsTechnician.Navigator>
  );
}

// Bottom tabs for technician 

const handleBackButton = () => {
  BackHandler.exitApp();
  return true;
}

const Tab2 = createBottomTabNavigator();
function TechnicianTabs() {
  return (
    <Tab2.Navigator initialRouteName='TechnicianHomestack'
      screenOptions={{
        //  tabBarStyle:{height:'6.5%'},
        //   tabBarStyle:{height:54},
        //   tabBarLabelStyle:{marginTop:-3,paddingBottom:5},
        // tabBarStyle: { position: 'absolute' },
        headerShown: false,
        tabBarActiveTintColor: '#ED9121',
        tabBarInactiveTintColor: '#301934',
      }}

    >
      <Tab2.Screen name="Home" component={TechnicianHomestack} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Octicons name="apps" color={color} size={size} />

        ),
      }}
        listeners={{
          focus: () => BackHandler.addEventListener('hardwareBackPress', handleBackButton)
          , blur: () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
        }}
      />
      <Tab2.Screen name="TrackScreen" component={TechnicianTrackScreenStack} options={{
        tabBarLabel: 'To-do-Lists',
        tabBarIcon: ({ color, size }) => (
          <Octicons name="briefcase" color={color} size={size} />
        ),
      }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Do something with the `navigation` object
            navigation.navigate('TrackScreen', { screen: 'TechOpenScreen' });
          },
        })} />
      <Tab2.Screen name="EmptyScreen" component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <AntDesign name="pluscircle" color={"#ED9121"} size={40}
                style={{ position: 'absolute', top: -10, bottom: -50, right: -20 }} />
            </View>
          ),
        }} />
      <Tab2.Screen name="PaymentScreen" component={PaymentScreenStack} options={{

        tabBarLabel: 'Payments',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-month-outline" color={color} size={size} />
        ),
      }} />
      <Tab2.Screen name="Settings" component={TechnicianSettingstack} options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-settings-outline" color={color} size={size} />
        ),
      }}
      />
    </Tab2.Navigator>
  );
}

// Bottom tabs for Customer

const handleBackButton1 = () => {
  BackHandler.exitApp();
  return true;
}

const Tab = createBottomTabNavigator();
function CustomerTabs() {
  return (
    <Tab.Navigator initialRouteName='Homestack'
      screenOptions={{
        //  tabBarStyle:{height:'6.5%'},
        //   tabBarStyle:{height:54},
        //   tabBarLabelStyle:{marginTop:-3,paddingBottom:5},
        // tabBarStyle: { position: 'absolute' },
        headerShown: false,
        tabBarActiveTintColor: '#ED9121',
        tabBarInactiveTintColor: '#301934',
      }}
    >
      <Tab.Screen name="Home" component={Homestack} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Octicons name="apps" color={color} size={size} />
        ),
      }}
        listeners={{
          focus: () => BackHandler.addEventListener('hardwareBackPress', handleBackButton1)
          , blur: () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton1)
        }} />
      <Tab.Screen name="TrackScreen" component={ConsumerTrackScreenStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Do something with the `navigation` object
            navigation.navigate('TrackScreen', { screen: 'TrackServiceRequestlist' });
          },
        })}
        options={{
          tabBarLabel: 'Track SRs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="EmptyScreen" component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <AntDesign name="pluscircle" color={"#ED9121"} size={40}
                style={{ position: 'absolute', top: -10, bottom: -50, right: -20 }} />
            </View>
          ),
        }} />
      <Tab.Screen name="PaymentScreen" component={PaymentScreen} options={{
        tabBarLabel: 'Payments',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-month-outline" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Settings" component={Settingstack} options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-settings-outline" color={color} size={size} />
        ),
      }}
      />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();
function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />

      <Stack.Screen name="WelcomeLandingPage" component={WelcomeLandingPage} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="CustomerRegister" component={CustomerRegister} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
      <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
      <Stack.Screen name="TechnicianRegister" component={TechnicianRegister} options={{ headerShown: false }} />
      <Stack.Screen name="ConsumerForgetPage" component={ConsumerForgetPage} options={{ headerShown: false }} />
      <Stack.Screen name="ConsumerChangePwd" component={ConsumerChangePwd} options={{ headerShown: false }} />
      <Stack.Screen name="ConsumerChangePwdSuccess" component={ConsumerChangePwdSuccess} options={{ headerShown: false }} />
      <Stack.Screen name="TechnicianPendingApprove" component={TechnicianPendingApprove} options={{ headerShown: false }} />
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name='TechnicianTabs' component={TechnicianTabs} />
      {/* <Stack.Screen name='Homestack' component={Homestack}  />
      <Stack.Screen name='Settingstack' component={Settingstack}  /> */}



    </Stack.Navigator>

  );

}



export default function ShopRoutes() {
  return (

    <NavigationContainer >

      <App />
    </NavigationContainer>
  );
}