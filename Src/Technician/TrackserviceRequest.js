import React, { Component, useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, TextInput } from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomePageTechnicianData, TechnicianAcceptHome } from "../Service/TechnicianService/TechnicianHomeServices";
// #ED9121
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Trackservicerequest = ({ navigation, route }) => {

    const [ArrowUpDown, setArrowUpDown] = useState(false);
    const [ArrowUpDownTech, setArrowUpDownTech] = useState(false);
    const [Repairexpected, setRepairexpected] = useState(false);
    const [TechviewData, setTechviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log("params", route.params)
        getTrack();
        // BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        // return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }, []);

    // useEffect(() => {
    //     const unsubscribe1 = navigation.addListener('didFocus', () => {
    //       getTrack();
    //     });
    //     return () => unsubscribe1();
    //   }, []);

    // useFocusEffect(
    //     React.useCallback( () => {
    //         getTrack();
    //         // return 0;
    //     }, [0])
    // );

    const getTrack = async () => {
        // let TechnicianID = await AsyncStorage.getItem('UserIdTechnician')
        // console.log("TechnicianTrackID ===> ", TechnicianID)
        // HomeTechnicianData(TechnicianID);
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
                                       onPress={()=>navigation.jumpTo('Home')}
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
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>#SR{route.params.service_req_id}
                            {/* #{global.serviceID} */}
                        </Text>
                        {/* <Text style={{ fontSize: 18 }}>{global.status}</Text> */}
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24,
                        marginTop: 5
                    }}>
                        <Text style={{ fontSize: 15 }}>{t('common:created_on')}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}> { moment(route.params.created_at).format('MMM DD yyyy')}
                            {/* {global.createdDate}  moment(route.params.created_at).format('DD-MM-yyyy')*/}
                        </Text>
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

                                    <Text style={{ fontSize: 13, left: -85, color: 'green' }}>{t('common:sr_details')}</Text>
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
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:warranty_status')}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10 }}>{t('common:warranty_until')}</Text>
                                    </View>

                                    <View style={{
                                        width: '60%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>Television</Text>
                                        {/* <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.brand}</Text>
                                    <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.model_no}</Text>
                                    <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.variants}</Text>
                                    <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.warranty_status}</Text>
                                    <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.warranty_limit}</Text> */}
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{route.params.brand}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{route.params.model_no}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{route.params.variants}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{route.params.warranty_status}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{moment(route.params.warranty_limit).format('DD-MM-yyyy')}</Text>
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
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>{route.params.damage}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{route.params.damage_description}</Text>
                                        {/* <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>{global.damage}</Text>
                                    <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.damage_description}</Text> */}
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right', textDecorationLine: "underline" }}>0 Items attached</Text>
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
                                        <View style={{
                                            width: '100%', height: '100%',
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View style={{
                                                width: '10%', height: '85%', backgroundColor: 'green', marginTop: -10
                                            }}></View>
                                        </View>

                                    </View>

                                    <View style={{
                                        width: '35%', height: '100%', flexDirection: 'column'
                                    }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:confirmed_slot')}</Text>
                                    </View>

                                    <View style={{
                                        width: '60%', height: '100%', flexDirection: 'column'
                                    }}>
                                        {/* <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>
                                        {global.slots}, {global.tech_visit}</Text> */}
                                        <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>
                                            {route.params.slots}, {moment(route.params.tech_visit).format('d MMM,yyyy')}</Text>
                                    </View>

                                </View>

                                {
                                    route.params.status == "Pending" &&
                                    <View style={{ height: "60%" }}>
                                        <View style={{
                                            flexDirection: 'row', height: '25%',
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
                                                <Text style={{ fontSize: 15, color: 'orange', marginLeft: 5 }}>{t('common:technician_confirmation_pending')}</Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row', height: '75%',
                                            width: '100%'
                                        }}>
                                            <View style={{
                                                width: '5%', height: '100%',
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <View style={{
                                                    width: '100%', height: '100%',
                                                    alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <View style={{
                                                        width: '10%', height: '75%', backgroundColor: 'orange', marginTop: -10
                                                    }}></View>
                                                </View>

                                            </View>

                                            <View style={{
                                                width: '100%', height: '100%', flexDirection: 'column'
                                            }}>
                                                <Text style={{ marginLeft: 5, marginTop: 5 }}>Please Wait! your request has been sent and</Text>
                                                <Text style={{ marginLeft: 5, marginTop: 5 }}>technician yet to confim it</Text>
                                            </View>


                                        </View>
                                    </View>
                                }
                                {
                                    route.params.status == "Accepted" &&
                                    <View style={{
                                        marginTop: 10,
                                        flexWrap: 'wrap',
                                        height: '45%', width: "100%",
                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Ionicons
                                                style={{}}
                                                size={20}
                                                color="green"
                                                name="checkmark-outline"
                                            />

                                            <Text style={{ fontSize: 15, left: -55, color: 'green' }}>{t('common:technicain_accepted')}</Text>
                                            <Text style={{ fontSize: 13, textAlign: 'right' }}>15 min ago</Text>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row', height: '70%',
                                            width: '100%'
                                        }}>
                                            <View style={{
                                                width: '5%', height: '100%',
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <View style={{
                                                    width: '10%', height: '85%', backgroundColor: 'green', marginTop: 10
                                                }}></View>
                                            </View>

                                            <View style={{
                                                width: '55%', height: '100%', flexDirection: 'column',
                                            }}>
                                                <Text style={{ marginLeft: 5, marginTop: 5 }}>Technican accepted</Text>
                                                <Text style={{ marginLeft: 5, marginTop: 3 }}>your request.</Text>

                                            </View>

                                            <View style={{
                                                width: '40%', height: '100%', flexDirection: 'column', justifyContent: "center"
                                            }}>
                                                <Text onPress={() => this.RBSheet.open()}
                                                    style={{ marginLeft: 5, marginTop: 5, textAlign: 'right', fontWeight: "bold", textDecorationLine: 'underline' }}>View Details</Text>

                                                {/* <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>{global.damage}</Text>
                                        <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.damage_description}</Text> */}

                                            </View>

                                        </View>
                                    </View>

                                }


                            </View>
                            :
                            <View></View>
                    }
                    {/* <View style = {{ flexDirection : 'row', backgroundColor : 'yellow' }}>
                <View style = {{ width : '40%', height : '10%', backgroundColor :'black' }}>

                </View>
            </View> */}

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24,
                        marginTop: ArrowUpDownTech == true ? 1 : 15,height:Repairexpected ? 100 :10
                    }}>
                        <View style={{
                            width: 9, height:  9, backgroundColor: 'orange',
                            borderRadius: 100,marginTop:7
                        }}>

                        </View>
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>Repair Expected SLA</Text>
                        {Repairexpected == true &&
                            <TouchableOpacity onPress={() => setRepairexpected(false)}>
                                <Ionicons
                                    style={{ marginLeft: 10 }}
                                    size={20}
                                    color="black"
                                    name="chevron-down-outline"
                                />
                            </TouchableOpacity>
                        }
                        {Repairexpected == false &&
                            <TouchableOpacity onPress={() => setRepairexpected(true)}>
                                <Ionicons
                                    style={{ marginLeft: 10 }}
                                    size={20}
                                    color="black"
                                    name="chevron-up-outline"
                                />
                            </TouchableOpacity>
                        }

                        {
                            Repairexpected == true ?
                                <View style={{
                                   
                                    flexWrap: 'wrap',
                                    height: '100%', width: "100%",
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                        <Ionicons
                                            style={{}}
                                            size={20}
                                            color="green"
                                            name="checkmark-outline"
                                        />

                                        <Text style={{ fontSize: 15, left: -90, color: 'green' }}>{t('common:sr_details')}</Text>
                                        <Text style={{ fontSize: 13, textAlign: 'right' }}>15 min ago</Text>

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
                                                width: '10%', height: '85%', backgroundColor: 'green', marginTop: 10
                                            }}></View>
                                        </View>

                                        <View style={{
                                            width: '35%', height: '100%', flexDirection: 'column'
                                        }}>
                                            <Text style={{ marginLeft: 5, marginTop: 5 }}>{t('common:type_of_damage')}</Text>

                                        </View>

                                        <View style={{
                                            width: '60%', height: '100%', flexDirection: 'column'
                                        }}>
                                            <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right', fontWeight: "bold" }}>in 48 hours</Text>

                                            {/* <Text style={{ marginLeft: 5, marginTop: 5, textAlign: 'right' }}>{global.damage}</Text>
                                    <Text style={{ marginLeft: 5, marginTop: 10, textAlign: 'right' }}>{global.damage_description}</Text> */}

                                        </View>

                                    </View>
                                </View>


                                :
                              <View></View>


                        }




                    </View>
                    <View style={{
                        height: "8%", width: Width, flexDirection: "row",
                        flexWrap: 'wrap',
                        marginHorizontal: 24, marginTop: Repairexpected == true ? 0 : 15
                    }}>
                        <TouchableOpacity style={{
                            width: '30%', height: '55%', backgroundColor: 'black',
                            borderRadius: 30, justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Text style={{ color: '#FFFFFF' }}>{t('common:cancel')}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={{
                                width: '30%', height: '55%', backgroundColor: 'orange',
                                marginLeft: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Text style={{ color: '#FFFFFF' }}>{t('common:accept')}</Text>
                        </TouchableOpacity> */}

                    </View>

                </View>
                <RBSheet

                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={400}
                    openDuration={250}
                    customStyles={{

                        container: {

                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                        }
                    }}
                >
                    <View style={{ height: "100%", marginLeft: 24, marginRight: 24 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:5 }}>
                            <View style={{ height: 8, marginTop: 5, width: 50, borderRadius: 25, backgroundColor: "grey" }} />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flex: 0.3 }}>

                            </View>
                            <View style={{ flex: 0.5, }}>
                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>Technican Details</Text>

                            </View>
                            <View style={{ flex: 0.2, alignItems: "flex-end", }}>
                                <AntDesign onPress={()=> this.RBSheet.close()}
                                 name="close" size={24}
                                />

                            </View>


                        </View>
                        <View style={{ height: '10%' }} />
                        <View style={{ height: "30%", flexDirection: 'row' }}>
                            <View style={{ flex: 0.3, }}>
                                <EvilIcons name="user" size={100} />
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Text style={{ fontSize: 11 }}>TCS{route.params.tech_id}</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: 'black' }}>{route.params.tech_name}</Text>
                                <Text>
                                    <Text style={{ fontSize: 18, color: "gold", }}>★★★★★   </Text>
                                    <Text style={{ fontSize: 14, }}>{"4.2(198)"}</Text>
                                </Text>

                                <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "#6495ED" }}>+91 {route.params.tech_mobileno}</Text>


                            </View>

                        </View>
                        <View style={{ height: "25%", borderWidth: 0.5 }}>
                            <TextInput
                                multiline
                                style={{ height: "100%", width: "100%", textAlignVertical: 'top' }}
                                placeholder=' Type your notes for the Technician here'

                            />

                        </View>
                        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10 }}>
                            <TouchableOpacity style={{
                                height: 40, width: 120, backgroundColor: "#D3D3D3",
                                alignItems: "center", justifyContent: 'center',borderRadius:120/2
                            }}>
                                <Text style={{color:"#FFFFFF",fontSize:16}} >Chat</Text>

                            </TouchableOpacity>

                        </View>

                    </View>
                    {/* <YourOwnComponent /> */}
                </RBSheet>
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

export default Trackservicerequest;