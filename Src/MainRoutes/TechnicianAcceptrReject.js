

import React, { Component, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomePageTechnicianData, TechnicianAcceptHome } from "../Service/TechnicianService/TechnicianHomeServices";
// #ED9121
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { useTranslation } from "react-i18next";



const TechnicianAcceptrReject = ({ navigation, route }) => {

    const [ArrowUpDown, setArrowUpDown] = useState(false);
    const [ArrowUpDownTech, setArrowUpDownTech] = useState(false);
    const [TechviewData, setTechviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        getTrack();
        // BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        // return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }, []);

    useEffect(() => {
        const unsubscribe1 = navigation.addListener('didFocus', () => {
          getTrack();
        });
        return () => unsubscribe1();
      }, []);

    useFocusEffect(
        React.useCallback( () => {
            getTrack();
            // return 0;
        }, [0])
    );

    const getTrack = async () => {
        let TechnicianID = await AsyncStorage.getItem('UserIdTechnician')
        console.log("TechnicianTrackID ===> ", TechnicianID)
        HomeTechnicianData(TechnicianID);
    }

    const HomeTechnicianData = (TechnicianID) => {
        console.log("TechnicianIDNew ===> ", TechnicianID)
        setIsLoading(true)
        HomePageTechnicianData(TechnicianID).then((result) => {
            setIsLoading(false)
            let responseJson = result;
            console.log("Success response Technician ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.status == "200") {
                // Toast.show(responseJson.data.message, Toast.LONG);
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.status))
                // setTechviewData(responseJson.data.data)

                global.serviceID = responseJson.data.data[0].service_req_id
                global.status = responseJson.data.data[0].status

                // global.createdDate = responseJson.data.data[0].created_at
                global.createdDate = moment(responseJson.data.data[0].created_at, "YYYY-MM-DDTHH:mm:ss Z").format('DD-MM-yyyy hh:mm')
                console.log("global.createdDate ==> ", global.createdDate)

                global.warranty_limit = moment(responseJson.data.data[0].warranty_limit, "YYYY-MM-DDTHH:mm:ss Z").format('DD-MM-yyyy')

                global.brand = responseJson.data.data[0].brand
                global.model_no = responseJson.data.data[0].model_no
                global.variants = responseJson.data.data[0].variants
                global.warranty_status = responseJson.data.data[0].warranty_status
                // global.warranty_limit = responseJson.data.data[0].warranty_limit

                global.damage = responseJson.data.data[0].damage
                global.damage_description = responseJson.data.data[0].damage_description

                global.slots = responseJson.data.data[0].slots
                global.tech_visit = moment(responseJson.data.data[0].tech_visit, "YYYY-MM-DDTHH:mm:ss Z").format('DD-MM-yyyy')

                console.log("global.serviceID ==> ", global.serviceID)
                setArrowUpDown(true)
                setArrowUpDownTech(true)
            }
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

    const handleBackButton = () => {
        navigation.goBack();
        return true;
    }

    const getDownArrow = () => {
        setArrowUpDown(false)
    }
    const getUpArrow = () => {
        setArrowUpDown(true)
    }

    const getDownArrowTech = () => {
        setArrowUpDownTech(false)
    }
    const getUpArrowTech = () => {
        setArrowUpDownTech(true)
    }

    const technicianaccept= async ()=>{
        let TechnicianID = await AsyncStorage.getItem('UserIdTechnician')

        setIsLoading(true)
       
        let inputJson = {
            "service_req_id":  global.serviceID,
            "srorderstatus": "1",
            "tech_id": TechnicianID
        }
        console.log("AcceptTechnician ===> ", TechnicianID,global.serviceID)
        TechnicianAcceptHome(inputJson).then((result) => {
            setIsLoading(false)
            let responseJson = result;
            console.log("responseJson ====> ", JSON.stringify(responseJson));
            console.log("Success response Technician ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.status == 200) {
                setIsLoading(false)
                // getData();
                Toast.show(responseJson.data.message, Toast.LONG);
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.status))

                navigation.jumpTo("Home")

            }
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

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
                    <View style={{
                        height: "8%", width: Width, flexDirection: "row",
                        borderBottomWidth: 1, borderBottomColor: 'gray'
                    }}>
                        <View style={{
                            flex: 0.20, alignItems: "center", justifyContent: 'center',
                            marginLeft: 20
                        }}>
                            <View style={{
                                height: "70%",
                                width: "70%", borderRadius: 8, alignItems: "center", justifyContent: "center"
                            }}>
                                <TouchableOpacity>
                                    <Ionicons
                                        size={30}
                                        color="black"
                                        name="chevron-back"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', paddingLeft: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{t('common:service_request_details')}</Text>
                        </View>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24,
                        justifyContent: 'space-between', marginTop: 15
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                            #{global.serviceID}</Text>
                        <Text style={{ fontSize: 18 }}>{global.status}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24,
                        marginTop: 5
                    }}>
                        <Text style={{ fontSize: 15 }}>{t('common:created_on')}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}> {global.createdDate}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24, alignItems: 'center',
                        marginTop: 15
                    }}>
                        <View style={{
                            width: '2.5%', height: '45%', backgroundColor: 'green',
                            borderRadius: 100
                        }}>

                        </View>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{t('common:service_request_details')}</Text>

                        {ArrowUpDown == true &&
                            <TouchableOpacity onPress={() => getDownArrow()}>
                                <Ionicons
                                    style={{ marginLeft: 10 }}
                                    size={20}
                                    color="black"
                                    name="chevron-down-outline"
                                />
                            </TouchableOpacity>
                        }
                        {ArrowUpDown == false &&
                            <TouchableOpacity onPress={() => getUpArrow()}>
                                <Ionicons
                                    style={{ marginLeft: 10 }}
                                    size={20}
                                    color="black"
                                    name="chevron-up-outline"
                                />
                            </TouchableOpacity>
                        }
                    </View>



                    {
                        ArrowUpDown == true ?
                            <View style={{
                                marginTop: 10,
                                flexWrap: 'wrap',
                                marginHorizontal: 24, height: '45%'
                            }}>

                                {/* SR Details */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Ionicons
                                        style={{}}
                                        size={20}
                                        color="green"
                                        name="checkmark-outline"
                                    />

                                    <Text style={{ fontSize: 15, left: -85, color: 'green' }}>{t('common:sr_details')}</Text>
                                    <Text style={{ fontSize: 13, textAlign: 'right' }}>15 min ago</Text>

                                </View>

                                <View style={{
                                    flexDirection: 'row', height: '50%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <View style={{
                                            width: '10%', height: '95%', backgroundColor: 'green'
                                        }}></View>
                                    </View>

                                    <View style={{
                                        width: '35%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:device')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:brand')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:modal')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:size')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:warranty_until')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:warranty_until')}</Text>
                                    </View>

                                    <View style={{
                                        width: '60%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>Television</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.brand}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.model_no}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.variants}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.warranty_status}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.warranty_limit}</Text>
                                    </View>

                                </View>

                                {/* Complaint Details */}

                                <View style={{
                                    flexDirection: 'row', height: '10%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Ionicons
                                            style={{}}
                                            size={20}
                                            color="green"
                                            name="checkmark-outline"
                                        />
                                    </View>

                                    <View style={{
                                        width: '40%', height: '100%', flexDirection: 'column', justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontSize: 15, color: 'green', marginLeft: 5 }}>{t('common:complaint_details')}</Text>
                                    </View>

                                    <View style={{
                                        width: '55%', height: '100%', flexDirection: 'column', justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontSize: 13, textAlign: 'right' }}>11 min ago</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row', height: '30%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <View style={{
                                            width: '10%', height: '85%', backgroundColor: 'green', marginTop: -10
                                        }}></View>
                                    </View>

                                    <View style={{
                                        width: '35%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:type_of_damage')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:descripition')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:attachments')}</Text>
                                    </View>

                                    <View style={{
                                        width: '60%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>{global.damage}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.damage_description}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>0 Items attached</Text>
                                    </View>

                                </View>

                            </View>
                            :
                            <View></View>
                    }

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24, alignItems: 'center',
                        marginTop: ArrowUpDown == true ? 1 : 15
                    }}>
                        <View style={{
                            width: '2.5%', height: '45%', backgroundColor: 'orange',
                            borderRadius: 100
                        }}>

                        </View>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>{t('common:technician_visit')}</Text>

                        {ArrowUpDownTech == true &&
                            <TouchableOpacity onPress={() => getDownArrowTech()}>
                                <Ionicons
                                    style={{ marginLeft: 10 }}
                                    size={20}
                                    color="black"
                                    name="chevron-down-outline"
                                />
                            </TouchableOpacity>
                        }
                        {ArrowUpDownTech == false &&
                            <TouchableOpacity onPress={() => getUpArrowTech()}>
                                <Ionicons
                                    style={{ marginLeft: 10 }}
                                    size={20}
                                    color="black"
                                    name="chevron-up-outline"
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    {
                        ArrowUpDownTech == true ?
                            <View style={{
                                marginTop: 10,
                                flexWrap: 'wrap',
                                marginHorizontal: 24, height: '20%'
                            }}>
                                <View style={{
                                    flexDirection: 'row', height: '15%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Ionicons
                                            style={{}}
                                            size={20}
                                            color="green"
                                            name="checkmark-outline"
                                        />
                                    </View>

                                    <View style={{
                                        width: '20%', height: '100%', flexDirection: 'column', justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontSize: 15, color: 'green', marginLeft: 5 }}>{t('common:visit_slot')}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row', height: '25%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    </View>

                                    <View style={{
                                        width: '35%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:confirmed_slot')}</Text>
                                    </View>

                                    <View style={{
                                        width: '60%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>
                                            {global.slots}, {global.tech_visit}</Text>
                                    </View>

                                </View>

                                <View style={{
                                    flexDirection: 'row', height: '15%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Ionicons
                                            style={{}}
                                            size={20}
                                            color="orange"
                                            name="checkmark-outline"
                                        />
                                    </View>

                                    <View style={{
                                        width: '95%', height: '100%', flexDirection: 'column', justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontSize: 15, color: 'orange', marginLeft: 5 }}>{t('common:your_confirmation')}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row', height: '45%',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '5%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    </View>

                                    <View style={{
                                        width: '40%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:customer_location')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:distance')}</Text>
                                    </View>

                                    <View style={{
                                        width: '55%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>
                                            View Details</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>
                                            2.5 Km</Text>
                                    </View>
                                </View>

                            </View>
                            :
                            <View></View>
                    }
                    {/* <View style = {{ flexDirection : 'row', backgroundColor : 'yellow' }}>
                    <View style = {{ width : '40%', height : '10%', backgroundColor :'black' }}>

                    </View>
                </View> */}
                    <View style={{
                        height: "8%", width: Width, flexDirection: "row",
                        flexWrap: 'wrap',
                        marginHorizontal: 24, marginTop: ArrowUpDownTech == true ? 0 : 15
                    }}>
                        <TouchableOpacity 
                        style={{
                            width: '30%', height: '55%', backgroundColor: 'black',
                            borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ color: '#FFFFFF' }}>{t('common:reject')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>technicianaccept()}
                            style={{
                                width: '30%', height: '55%', backgroundColor: 'orange',
                                marginLeft: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Text style={{ color: '#FFFFFF' }}>{t('common:accept')}</Text>
                        </TouchableOpacity>

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
                        backgroundColor: 'transparent',
                        top: 50
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

}
export default TechnicianAcceptrReject;