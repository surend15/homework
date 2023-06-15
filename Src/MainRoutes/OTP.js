
import React, { useState, useEffect,useRef } from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView,
  Platform, TouchableOpacity, Dimensions, Keyboard, ActivityIndicator
} from 'react-native';
import { useTranslation } from "react-i18next";
import { OTPVerifyConsumer, ResendOtp } from '../Service/LoginService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';
import { S3_Icon } from '../../assets/index';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import Ionicons from 'react-native-vector-icons/Ionicons';
const OTP = ({ navigation, props, route }) => {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [Count, setCount] = useState(0);
  const [Click, setClick] = useState(0);
  const [otpfetch, setotpfetch] = useState("");
  const [Emailnew, setEmailnew] = useState(route.params?.emailcheck);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  // const otpRef = useRef(null);

  useEffect(() => {
    console.log("Email check ==> ", Emailnew)
    // setTimeout(() => otpRef.current.focusField(0), 250);
  }, []);
  const Resend = () => {

    let inputJson = { email: Emailnew }
    ResendOtp(inputJson).then((result) => {
      setIsLoading(false)
      let responseJson = result;
      console.log("Success rr ==> ", responseJson.data.success, JSON.stringify(responseJson.data))

      if (responseJson.data.success == true) {
        console.log("Success resending otp ==> ", responseJson.data.status, JSON.stringify(responseJson.data))
        Toast.show(responseJson.data.message, Toast.LONG);
        setClick(Click + 1);
        let n = 30;
        setInterval(() => {
          if (n < 0) {
            return;
          }
          else {
            setCount(n);
            n -= 1;
          }
        }, 1000)
      }
      else {
        Toast.show(responseJson.data.message, Toast.LONG);
      }
      // else if(responseJson.data.success == false){
      //     Toast.show(responseJson.data.message, Toast.LONG);
      // }
    }).catch((error) => {
      console.log("false", error)
      let responseJson = error;
      console.log("Error1", responseJson)
      if (responseJson.status == 400) {
        setIsLoading(false)
        Toast.show(responseJson.message, Toast.LONG);
      } else {
        setIsLoading(false)
        Toast.show(responseJson.message, Toast.LONG);
      }
    });
  }
  const verifyOTP = () => {
    Keyboard.dismiss();
    console.log("otp fetch ===> ",otpfetch)
    setIsLoading(true)
    if (otpfetch.length <= 3) {
      Toast.show("Check Your OTP", Toast.LONG);
      setIsLoading(false)
    } else {
      setIsLoading(true)
      let inputJson = {
        "email": Emailnew,
        "otp": otpfetch
      }
      OTPVerifyConsumer(inputJson).then((result) => {
        setIsLoading(false)
        let responseJson = result;
        console.log("Success response login ==> ", JSON.stringify(responseJson.data))
        if (responseJson.data.success == true) {
          navigation.navigate('ConsumerChangePwd', { emailcheck: Emailnew });
          Toast.show(responseJson.data.message, Toast.LONG);
        }
        // else {
        //     Toast.show(responseJson.data.message, Toast.LONG);
        // }
      }).catch((error) => {
        console.log("false", error)
        let responseJson = error;
        console.log("Error1", responseJson)
        if (responseJson.success == false) {
          setIsLoading(false)
          Toast.show(responseJson.message, Toast.LONG);
        }
      });
    }
  }

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
          <View style={{ height: "7%", width: Width, marginLeft: 20, flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.goBack()} 
            style={{ flex: 0.15, alignItems: "center", justifyContent: 'center' }}>
              <View style={{
                borderColor: '#D3D3D3', borderWidth: 0.5, height: "70%",
                width: "70%", borderRadius: 8, alignItems: "center", justifyContent: "center"
              }}>
                <Ionicons
                  size={30}
                  color="black"
                  name="chevron-back"
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: 10 }}>
              <S3_Icon width={40} height={40} />
            </View>
            <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', paddingLeft: '3%' }}>

              <Ionicons size={30} name="location-outline" />
            </View>
          </View>

          <View style={{ height: '93%', margin: 20, }}>
            <View style={{ height: '5%' }}>
              <Text style={{ fontSize: 25, color: 'black', fontWeight: "bold" }}>{t('common:Otpverification')}</Text>
            </View>
            <View style={{ height: '5%' }}>
              <Text style={{ fontSize: 16, }}>{t('common:Otp_msg')}</Text>
            </View>
            <View style={{ height: "4%" }} />
            <View style={{ height: "15%", flexDirection: "row",
          justifyContent : 'center', alignItems : 'center' }}>
              <OTPInputView
              // ref={otpRef}
                // onCodeFilled={(value) => this.setState({ otpfetch: value })}
                //onCodeFilled={code=>{}}
                keyboardType='number-pad'
                style={{ width: '90%', height: 45, }}
                pinCount={4}
                code={otpfetch}
                onCodeChanged={value => setotpfetch(value)}
                autoFocusOnLoad={false}
               
                codeInputFieldStyle={{
                  backgroundColor: "#FFFF",
                  width: 70,
                  height: 70,
                  borderWidth: 1,
                  borderRadius: 10,
                  //borderBottomWidth: wp(0.30),
                  color: '#202020',
                }}
                codeInputHighlightStyle={{ borderColor: 'orange', }}
              />
              {/* <View style={{
                height: Height / 16,
                width: Width / 6.5,
                marginBottom: 20,
                fontSize: 14,
                borderColor: '#707070',
                borderWidth: 0.3,
                borderRadius: 8,
                marginLeft: 20,
                marginRight: 5,

              }}>
                <TextInput
                  placeholder="X"
                  selectionColor='#707070'
                  placeholderTextColor="#707070"
                  style={{
                    color: "#707070",
                    flex: 1,
                    paddingLeft: 0,
                    fontSize: 20,
                    fontFamily: 'Montserrat-Regular',
                    alignSelf: 'center', marginLeft: 10
                  }}
                  maxLength={1}
                  onChangeText={(e)=>setOtp1(e)}
                  value={otp1}
                />
              </View>
              <View style={{
                height: Height / 16,
                width: Width / 6.5,
                marginBottom: 20,
                fontSize: 14,
                borderColor: '#707070',
                borderWidth: 0.3,
                borderRadius: 8,
                marginLeft: 20,
                marginRight: 5,

              }}>
                <TextInput
                  placeholder="X"
                  selectionColor='#707070'
                  placeholderTextColor="#707070"
                  style={{
                    color: "#707070",
                    flex: 1,
                    paddingLeft: 0,
                    fontSize: 20,                    
                    fontFamily: 'Montserrat-Regular',
                    alignSelf: 'center', marginLeft: 10
                  }}
                  maxLength={1}
                  onChangeText={(e)=>setOtp2(e)}
                  value={otp2}
                />
              </View>
              <View style={{
                height: Height / 16,
                width: Width / 6.5,
                marginBottom: 20,
                fontSize: 14,
                borderColor: '#707070',
                borderWidth: 0.3,
                borderRadius: 8,
                marginLeft: 20,
                marginRight: 5,

              }}>
                <TextInput
                  placeholder="X"
                  selectionColor='#707070'
                  placeholderTextColor="#707070"
                  style={{
                    color: "#707070",
                    flex: 1,
                    paddingLeft: 0,
                    fontSize: 20,                  
                    fontFamily: 'Montserrat-Regular',
                    alignSelf: 'center', marginLeft: 10
                  }}
                  maxLength={1}
                  onChangeText={(e)=>setOtp3(e)}
                  value={otp3}
                />
              </View>
              <View style={{
                height: Height / 16,
                width: Width / 6.5,
                marginBottom: 20,
                fontSize: 14,
                borderColor: '#707070',
                borderWidth: 0.3,
                borderRadius: 8,
                marginLeft: 20,
                marginRight: 5,

              }}>
                <TextInput
                  placeholder="X"
                  selectionColor='#707070'
                  placeholderTextColor="#707070"
                  style={{
                    color: "#707070",
                    flex: 1,
                    paddingLeft: 0,
                    fontSize: 20,                   
                    fontFamily: 'Montserrat-Regular',
                    alignSelf: 'center', marginLeft: 10
                  }}
                  maxLength={1}
                  onChangeText={(e)=>setOtp4(e)}
                  value={otp4}
                />
              </View> */}

            </View>




            <View style={{ flexDirection: 'row', height: "5%", alignItems: "center", justifyContent: 'space-between' }}>
              <Text style={{ color: 'orange' }}>00:{Count < 10 ? '0' : ''}{Count}</Text>

              <TouchableOpacity onPress={Count <= 0 ? Resend : () => { }}>
                <Text style={{ color: 'grey', fontWeight: "bold", fontSize: 15, opacity: Count === 0 && Click < 3 && Click >= 0 ? 1 : 0.3 }}>{t('common:Resend')}</Text>
              </TouchableOpacity>

            </View>

            <View>
              <TouchableOpacity onPress={() => verifyOTP()}
                style={{ height: 58, alignItems: "center", justifyContent: "center", backgroundColor: "#ED9121", borderRadius: 8, marginTop: 20 }}>
                <Text style={{ color: "#FFFF", fontWeight: 'bold', fontSize: 16 }}>{t('common:Verify')}</Text>
              </TouchableOpacity>
            </View>

          </View>


        </View>
      </ScrollView>
      {isLoading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: 'transparent'
          }}
        >
          <ActivityIndicator
            size={40}
            color={"orange"}
            backgroundColor={"transparent"}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default OTP;