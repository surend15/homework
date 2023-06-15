import React, { Component, useState, useEffect } from 'react'
import {
  View, Text, SafeAreaView, TouchableOpacity,
  Keyboard, ScrollView, Dimensions, ActivityIndicator, FlatList, BackHandler, Image,
} from 'react-native'
import { useTranslation } from "react-i18next";
import moment from 'moment';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { S3_Icon } from '../../assets/index';
import Toast from 'react-native-simple-toast';
import { Consumerserviceorder, HomePageConsumerData } from '../Service/CustomerService/HomePageService';
import { SvgUri } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const HomePageConsumer = ({ navigation }) => {
  const [emailAddress, setemailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [HomeData, setHomeData] = useState([]);
  const [oderlist, setorderlist] = useState([]);
  const [ConsumerIDNew, setConsumerIDNew] = useState([]);
  const [ConsFullname, setConsFullname] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getData();
    // BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
  }, []);
  useEffect(() => {
    const unsubscribe1 = navigation.addListener('didFocus', () => {
      getData();
    });
    return () => unsubscribe1();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      // return 0;
    }, [0])
  );

  const getData = async () => {
    consumerorders();
    let ConsumerID = await AsyncStorage.getItem('UserIdConsumer')
    let ConsName = await AsyncStorage.getItem('ConsumerName')
    console.log("ConsumerID ===> ", ConsumerID, ConsName)
    setConsumerIDNew(ConsumerID)
    setConsFullname(ConsName)
    HomeConsumerData();
   
  }

  // const handleBackButton = () => {
  //   console.log("Exit app")
  //     BackHandler.exitApp();
  //     return true;
  // }

  // useEffect(() => {
  //   const unsubscribe1 = navigation.addListener('focus', () => {
  //     console.log("Refresh home page focus on == > ")
  //     HomeConsumerData();
  //     BackHandler.addEventListener('hardwareBackPress', handleBackButton1);
  //   });
  //   return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton1)
  //   return () => unsubscribe1();
  // }, []);

  // const handleBackButton1 = () => {
  //   console.log("Exit app")
  //     BackHandler.exitApp();
  //     return true;
  // }

  const consumerorders = () => {
    Consumerserviceorder().then((result) => {
      console.log("consumerorders", JSON.stringify(result.data.data[0]))
      if (result.data.status == "200") {
        setorderlist(result.data.data[0])

      }
    }).catch((error) => {
      console.log("false----->", error)
      let responseJson = error;
      console.log("Error1----->", responseJson)
      if (responseJson.status == 400) {
        // setIsLoading(false)
        Toast.show(responseJson.message, Toast.LONG);
      } else {
        // setIsLoading(false)
        Toast.show(responseJson.message, Toast.LONG);
      }
    });
  }

  const HomeConsumerData = async () => {
    setIsLoading(true)
    HomePageConsumerData().then((result) => {
      let responseJson = result;
      console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data))
      if (responseJson.data.status == "200") {
        setIsLoading(false)
        // Toast.show(responseJson.data.message, Toast.LONG);
        console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.status))
        setHomeData(responseJson.data.data)

      }
      // else if(responseJson.data.status == "400"){
      //     Toast.show(responseJson.data.message, Toast.LONG);
      // } else {
      //     Toast.show(responseJson.data.message, Toast.LONG);
      // }
    }).catch((error) => {
      console.log("false----->", error)
      let responseJson = error;
      console.log("Error1----->", responseJson)
      if (responseJson.status == 400) {
        setIsLoading(false)
        Toast.show(responseJson.message, Toast.LONG);
      } else {
        setIsLoading(false)
        Toast.show(responseJson.message, Toast.LONG);
      }
    });
  }

  const getAppliancesDetails = (item) => {
    console.log("Appliances id ==> ", item.appliance_id, ConsumerIDNew)
    navigation.navigate('TrackScreen', {
      screen: 'ConsumerCreateServicePage',
      params: {
        ApplianceID: item.appliance_id, loginconsumerID: ConsumerIDNew,
        labourFee: item.basic_labour_fee
      }
    });
  }

  return isLoading ?
  <View style={{
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  }}>
        <ActivityIndicator
            size={40}
            color={"orange"}
            backgroundColor={"transparent"}
          />
  </View>
  :
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
      <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
        <View style={{
          height: "8%", width: Width, flexDirection: "row",
          borderBottomWidth: 1, borderBottomColor: 'gray'
        }}>
          <View style={{
            flex: 0.15, alignItems: "center", justifyContent: 'center',
            marginLeft: 10
          }}>
            <View style={{
              height: "70%",
              width: "70%", alignItems: "center", justifyContent: "center"
            }}>
              <Ionicons
                size={30}
                color="black"
                name="reorder-three-outline"
              />
            </View>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: 10 }}>
            <S3_Icon width={40} height={40} />
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 24,
            justifyContent: 'space-between', marginTop: 15
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('common:welcome_firstname')} {ConsFullname}!</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 24,
            justifyContent: 'space-between', marginTop: 5
          }}>
            <Text style={{ fontSize: 16 }}>{t('common:welcome_msg')}</Text>
          </View>
          {/* <TouchableOpacity style={{ width: "100%", height: "20%", }}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFD68A', '#FFFFFF']}
              style={{
                marginTop: 20, width: "90%", height: 130,
                borderColor: "orange", borderWidth: 1, borderRadius: 9, marginLeft: "4%",
                flexDirection: 'row'
              }} >
              <View style={{ width: '5%' }}>

              </View>
              <View style={{ width: '87%' }}>
                <Text style={{ paddingLeft: "1%", fontSize: 20, fontWeight: "bold", marginTop: "5%" }}>
                  {t('common:ComingSoon')}</Text>
                <View style={{ width: "100%" }}>
                  <Text style={{ paddingLeft: "1%", fontSize: 14, marginTop: "2%" }}>{t('common:ComingSoon_msg')}</Text>
                </View>
              </View>
              <View style={{ width: '8%', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Ionicons
                  size={25}
                  color="orange"
                  name="chevron-forward-outline"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity> */}

          { oderlist == undefined ?
          <View></View>

: 

          <TouchableOpacity onPress={() => navigation.jumpTo('TrackScreen', { screen: 'TrackserviceRequestproduct', params: oderlist })}
            style={{ width: "100%", height: "20%" }}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFD68A', '#FFFFFF']}
              style={{
                marginTop: 20, width: "90%", height: 150,
                borderColor: "orange", borderWidth: 1, borderRadius: 9, marginLeft: "4%",
                flexDirection: 'row'
              }} >
              <View style={{ width: '5%' }}>

              </View>
              <View style={{ width: '87%' }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <View style={{ width: '70%' }}>
                    <Text style={{ paddingLeft: "1%", fontSize: 20, fontWeight: "bold", marginTop: "5%" }}>
                      #{oderlist.service_req_id}</Text>
                    <View style={{ width: "100%" }}>
                      <Text style={{ paddingLeft: "1%", fontSize: 14, marginTop: "0%", overflow: 'hidden' }}>{oderlist.model_no}</Text>
                    </View>
                  </View>
                  <View style={{ width: '40%', height: '100%',marginTop:5,alignItems:"center",flexDirection:"row",justifyContent:"center" }}>
                    <AnimatedCircularProgress
                    style={{position:"absolute",top:8}}
                      size={73}
                      width={8}
                      fill={75}
                      tintColor="#E8ECF4"
                      renderCap={(data)=>
                        <View style={{height:73,alignItems:"center",justifyContent:"center"}}>
                              <Text style={{fontSize:16}}>30%</Text>
                        </View>

                      
                     }
                      
                      onAnimationComplete={() => console.log('onAnimationComplete')}
                      backgroundColor="#FA9B09" 
                     
                      
                      
                      />
                  </View>
                </View>
                <View style={{ width: "100%", marginTop: '10%', flexDirection: 'row' }}>
                  <View style={{ width: '50%' }}>
                    <Text>Technicians</Text>
                    <Image style={{ width: 30, height: 30, borderRadius: 50, marginTop: '2%' }} source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" }} />
                  </View>
                  <View>
                    <Text>Due date</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons
                        size={20}
                        style={{ marginTop: 4, paddingRight: 3 }}
                        name="calendar-outline"
                      />
                      <Text style={{ marginTop: '5%', fontWeight: "bold", color: "black" }}>{moment(oderlist.tech_visit).format('MMM DD,yyyy')}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: '8%', justifyContent: 'flex-end', marginBottom: 10 }}>

                <Ionicons
                  size={25}
                  color="orange"
                  name="chevron-forward-outline"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
}


          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 24,
            justifyContent: 'space-between', marginTop: 15
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('common:repaired')}</Text>
          </View>

          {/* FlatList Design */}

          <View style={{}}>
            <FlatList
              // contentContainerStyle={{ paddingBottom: '30%' }}
              data={HomeData}
              scrollEnabled={true}
              numColumns={2}
              //initialNumToRender={10}
              // ListEmptyComponent={ListEmpty()}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => getAppliancesDetails(item)}
                  style={{
                    width: "45%", height: Height / 5, borderColor: "orange",
                    borderWidth: 1, borderRadius: 9, marginLeft: 15, marginTop: 10
                  }}>
                  <View style={{ height: '75%', justifyContent: 'center' }}>
                    <SvgUri
                      width={"70%"}
                      style={{ margin: 10 }}
                      height={"70%"}
                      uri={"http://161.97.72.249:3005/" + item.appliance_image}
                    />
                  </View>
                  <View style={{
                    height: '25%', alignItems: 'center', width: "100%",
                    flexDirection: 'row', marginHorizontal: 10
                  }}>
                    <View style={{ flex: 0.8 }}>
                      <Text>{item.appliance_name}</Text>
                    </View>
                    <View style={{ flex: 0.2 }}>
                      <Ionicons
                        size={20}
                        color="orange"
                        name="chevron-forward-outline"

                      />

                    </View>


                  </View>
                </TouchableOpacity>
              } />
          </View>

          <TouchableOpacity style={{ width: "92%", backgroundColor: "orange", borderRadius: 12, height: 60, marginLeft: "3%", marginTop: "5%", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, color: "white", alignItems: "center", justifyContent: "center", }}>{t('common:MoreElectronics')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: "100%", height: "60%" }}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFD68A', '#FFFFFF']}
              style={{
                marginTop: 20, width: "90%", height: 130,
                borderColor: "orange", borderWidth: 1, borderRadius: 9, marginLeft: "4%",
                flexDirection: 'row'
              }} >
              <View style={{ width: '5%' }}>

              </View>
              <View style={{ width: '87%' }}>
                <Text style={{ paddingLeft: "1%", fontSize: 20, fontWeight: "bold", marginTop: "5%" }}>
                  {t('common:ComingSoon')}</Text>
                <View style={{ width: "100%" }}>
                  <Text style={{ paddingLeft: "1%", fontSize: 14, marginTop: "2%" }}>{t('common:ComingSoon_msg')}</Text>
                </View>
              </View>
              <View style={{ width: '8%', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Ionicons
                  size={25}
                  color="orange"
                  name="chevron-forward-outline"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* {isLoading ? (
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
      ) : null} */}
    </SafeAreaView>
}
export default HomePageConsumer;