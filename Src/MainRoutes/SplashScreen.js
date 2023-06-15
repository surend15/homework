import * as React from 'react';
import { View, Text,SafeAreaView ,Dimensions,TextInput,ScrollView} from 'react-native';
import { S3_Icon } from '../../assets/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import SplashScreen from 'react-native-splash-screen';

const Splashscreen=({navigation})=>{
    React.useEffect(()=>{
        initialScreen()
        //  Mainscreen();
    },[])

    const initialScreen= async()=>{
        const LoginStatus = await AsyncStorage.getItem('Customer') 
        const LoginStatus1 = await AsyncStorage.getItem('Technician') 
        setTimeout(() => {
            Mainscreen(LoginStatus, LoginStatus1);
          }, 1000);
    }
    
    const Mainscreen=(LoginStatus, LoginStatus1)=>{
        console.log("Check splash ==> ", LoginStatus, LoginStatus1)
        if (LoginStatus== "true"){
            navigation.replace('CustomerTabs');
            // CustomerTabs
        } else if(LoginStatus1 == "true") {
            navigation.replace('TechnicianTabs');
        } 
        else{
            navigation.replace('WelcomeLandingPage');
        }
        SplashScreen.hide();
        // setTimeout(()=>{
        //     navigation.navigate('Login')
        // },1000)
    }
    return(
       
       <View style={{flex:1,height:Height,width:Width,alignItems:"center",justifyContent:"center"}}>
         <S3_Icon width={100} height={100} />
       </View>
       
    );
}
export default Splashscreen;