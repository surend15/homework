import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, ScrollView, TouchableOpacity, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/Fontisto';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { S3_Icon } from '../../assets/index';
import { HomePageTechnicianData, TechnicianAcceptHome } from "../Service/TechnicianService/TechnicianHomeServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { useTranslation } from "react-i18next";


const HomepageTechnician = ({ navigation }) => {
    const Received = () => {
        setpage(true), setpage1(false)
    }
    const [page, setpage] = useState(true);
    const [page1, setpage1] = useState(false);
    const [TechnicianIDNew, setTechnicianIDNew] = useState("");
    const [TechnicianData, setTechnicianData] = useState([]);
    const [TechServiceID, setTechServiceID] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [TechFullname, setTechFullname] = useState("");
    const { t, i18n } = useTranslation()

    useEffect(() => {
        getData();
        // BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        // return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }, []);

    useEffect(() => {
        const unsubscribe1 = navigation.addListener('focus', () => {
            // console.log("Refresh home page focus on == > ")
            getData();
        });
        return () => unsubscribe1();
    }, []);

    // const handleBackButton = () => {
    //     BackHandler.exitApp();
    //     return true;
    // }

    const getData = async () => {
        let TechnicianID = await AsyncStorage.getItem('UserIdTechnician')
        let TechName = await AsyncStorage.getItem('TechnicianName')
        console.log("TechnicianID ===> ", TechnicianID, TechName)
        setTechnicianIDNew(TechnicianID)
        setTechFullname(TechName)
        HomeTechnicianData(TechnicianID);
    }

    const HomeTechnicianData = (TechnicianID) => {
        console.log("TechnicianIDNew ===> ", TechnicianID)
        HomePageTechnicianData(TechnicianID).then((result) => {
            let responseJson = result;
            console.log("Success response Technician ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.status == "200") {
                // Toast.show(responseJson.data.message, Toast.LONG);
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.status))
                setTechnicianData(responseJson.data.data)
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

    //Accpet Home
    const AcceptTechnician = () => {
        setIsLoading(true)
        console.log("AcceptTechnician ===> ", TechnicianIDNew, TechnicianData[0].service_req_id)
        let inputJson = {
            "service_req_id": TechnicianData[0].service_req_id,
            "srorderstatus": "1",
            "tech_id": TechnicianIDNew
        }
        TechnicianAcceptHome(inputJson).then((result) => {
            setIsLoading(false)
            let responseJson = result;
            console.log("responseJson ====> ", JSON.stringify(responseJson));
            console.log("Success response Technician ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.status == 200) {
                setIsLoading(false)
                getData();
                Toast.show(responseJson.data.message, Toast.LONG);
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.status))

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

    //Reject Home
    const RejectTechnician = () => {
        setIsLoading(true)
        console.log("AcceptTechnician ===> ", TechnicianIDNew, TechnicianData[0].service_req_id)
        let inputJson = {
            "service_req_id": TechnicianData[0].service_req_id,
            "srorderstatus": "2",
            "tech_id": TechnicianIDNew
        }
        TechnicianAcceptHome(inputJson).then((result) => {
            setIsLoading(false)
            let responseJson = result;
            console.log("responseJson ====> ", JSON.stringify(responseJson));
            console.log("Success response Technician ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.status == 200) {
                setIsLoading(false)
                getData();
                Toast.show(responseJson.data.message, Toast.LONG);
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.status))

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
                    <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                        <Ionicons size={30} name="notifications-outline" />
                        <Ionicons size={30} name="location-outline" />
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginHorizontal: 24,
                            justifyContent: 'space-between', marginTop: 15
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('common:welcome_firstname')} {TechFullname}!</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginHorizontal: 24,
                            justifyContent: 'space-between', marginTop: 5
                        }}>
                            <Text style={{ fontSize: 16 }}>{t('common:technician_home_text')}.</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, height: hp('100%'), width: wp('100%'), backgroundColor: "white" }}>
                        <View style={{ width: "100%", flexDirection: "row", marginTop: "5%", }}>
                            <View style={{ width: "50%", }}>
                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 17, marginLeft: "10%" }}>{t('common:summary')}</Text>
                                <Text style={{ marginTop: "5%", marginLeft: "10%", fontSize: 15, }}>{t('common:apr_29_may_04')}</Text>
                            </View>
                            <View style={{ width: "50%", marginTop: 5, flexDirection: 'row' }} >
                                <Text style={{ color: "black", fontSize: 14, marginLeft: "45%" }}>{t('common:this_week')}</Text>
                                <Ionicons
                                    size={20}
                                    color="black"
                                    name="chevron-down-outline"
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%", marginLeft: "1%" }}>
                            <View style={{ marginTop: 20, width: "43%", height: 95, borderColor: "grey", borderWidth: 0.5, borderRadius: 18, marginLeft: "4%" }} >
                                <Text style={{ paddingLeft: "5%", fontSize: 14, marginTop: "10%" }}>{t('common:total_assigned_ssr')}</Text>
                                <Text style={{ paddingLeft: "10%", fontSize: 22, marginTop: "7%", fontWeight: "bold" }}>-</Text>
                            </View>
                            <View style={{ marginTop: 20, width: "43%", height: 95, borderColor: "grey", borderWidth: 0.5, borderRadius: 18, marginLeft: "4%" }} >
                                <Text style={{ paddingLeft: "5%", fontSize: 14, marginTop: "10%" }}>{t('common:available_credits')}</Text>
                                <Text style={{ paddingLeft: "10%", fontSize: 22, marginTop: "7%", color: "green" }}>400</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%", marginLeft: "1%" }}>
                            <View style={{ marginTop: 10, width: "43%", height: 95, borderColor: "grey", borderWidth: 0.5, borderRadius: 18, marginLeft: "4%" }} >
                                <Text style={{ paddingLeft: "5%", fontSize: 14, marginTop: "10%" }}>{t('common:spare_parts_ordered')}</Text>
                                <Text style={{ paddingLeft: "10%", fontSize: 22, marginTop: "7%", fontWeight: "bold" }}>-</Text>
                            </View>
                            <View style={{ marginTop: 10, width: "43%", height: 95, borderColor: "grey", borderWidth: 0.5, borderRadius: 18, marginLeft: "4%" }} >
                                <Text style={{ paddingLeft: "5%", fontSize: 14, marginTop: "10%" }}>{t('common:my_revenue')}</Text>
                                <Text style={{ paddingLeft: "10%", fontSize: 22, marginTop: "7%", fontWeight: "bold" }}>-</Text>
                            </View>
                        </View>

                        <View style={{ width: "100%", backgroundColor: "#dcdcdc", height: "0.7%", marginTop: "4%" }}></View>

                        <View style={{
                            marginTop: "5%",
                            height: Height / 25, marginHorizontal: 24
                        }}>
                            <View style={{
                                width: '100%', height: '100%',
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    width: '70%', height: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: "bold", color: "black"
                                    }}>{t('common:track_to_do_list')}</Text>

                                </View>

                                <View style={{
                                    width: '30%', height: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <AntDesign name="arrow-right-l" size={25} color="black" style={{ marginLeft: "70%" }}></AntDesign>
                                </View>

                            </View>

                        </View>

                        <View style={{
                            height: Height / 20, marginHorizontal: 24,
                        }}>
                            <View style={{
                                width: '100%', height: '100%',
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    width: '40%', height: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity onPress={() => { setpage(true), setpage1(false) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: "black"
                                        }}>{t('common:received')} ({TechnicianData.length})</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{
                                    width: '40%', height: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity onPress={() => { setpage(false), setpage1(true) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: "black"
                                        }}>{t('common:send')}(0)</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: "50%", backgroundColor: "#dcdcdc", height: "0.2%",
                            marginHorizontal: 24, top: -5, flexDirection: 'row'
                        }}>
                            <View style={{ width: '55%', height: '100%', backgroundColor: page == true ? 'orange' : '#dcdcdc' }}>

                            </View>
                            <View style={{ width: '45%', height: '100%', backgroundColor: page1 == true ? 'orange' : '#dcdcdc' }}>

                            </View>
                        </View>

                        {page == true &&
                            <View style={{ width: "100%", height: "15%", }}>
                                <View style={{ marginTop: "2%" }}>
                                    {TechnicianData.length == 0 ?
                                        <Text style={{ fontSize: 14, color: "black", marginLeft: "6%" }}>
                                            None Request Received </Text>
                                        :
                                        <Text style={{ fontSize: 14, color: "black", marginLeft: "6%" }}>
                                            Service Request ID : #{TechnicianData[0].service_req_id} </Text>

                                    }
                                    {TechnicianData.length == 0 ?
                                        <View></View>
                                        :
                                        <View style={{ flexDirection: "row", width: "100%" }}>
                                            <TouchableOpacity onPress={() => { RejectTechnician() }}
                                                style={{ width: "28%", backgroundColor: "black", marginLeft: "4%", height: 40, borderRadius: 20, marginTop: "4%" }} >
                                                <Text style={{ color: "white", textAlign: "center", marginTop: "5%" }}>{t('common:reject')}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { AcceptTechnician() }}
                                                style={{ width: "28%", backgroundColor: "orange", marginLeft: "3%", height: 40, borderRadius: 20, marginTop: "4%" }} >
                                                <Text style={{ color: "white", textAlign: "center", marginTop: "5%" }}>{t('common:accept')}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('TrackScreen',
                                                    {
                                                        screen: 'TechnicianAcceptrReject',
                                                        params: { ApplianceID: TechnicianData }
                                                    })}
                                                style={{ width: "28%", backgroundColor: "black", marginLeft: "3%", height: 40, borderRadius: 20, marginTop: "4%" }} >
                                                <Text style={{ color: "white", textAlign: "center", marginTop: "5%" }}>{t('common:view_details')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                        }
                        {page1 == true &&
                            <View style={{ width: "100%", height: "15%" }}>
                                <Text style={{ color: "black", marginTop: "3%", marginLeft: '6%' }}>Send</Text>
                            </View>
                        }
                        <View style={{ width: "100%", backgroundColor: "#dcdcdc", height: "0.7%", }}></View>

                    </View>
                </ScrollView>
            </View>
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
    )
}
export default HomepageTechnician;