import React, { useState, useEffect } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity, TextInput,
    Keyboard, ScrollView, Dimensions, ActivityIndicator, FlatList, BackHandler, Image
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { S3_Icon } from '../../assets/index';
import { ConsumerProductdetalis } from '../Service/CustomerService/HomePageService';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useTranslation } from "react-i18next";

import { useFocusEffect, useNavigation } from '@react-navigation/native';

const TrackserviceRequestproduct = ({navigation,route}) => {
    const [TrackData, setTrackData] = useState([]);
    const [ViewData, setViewData] = useState([])
    const [ServiceRequest, setServiceRequest] = useState(false)
    const [TechnicianVisit, setTechnicianVisit] = useState(false)
    const [RepairExpected, setRepairExpected] = useState(false)
    const [ClosureDetail, setClosureDetail] = useState(false)
    const [PaymentsDetails, setPaymentsDetails] = useState(false)
    const { t, i18n } = useTranslation();



    useEffect(() => {
        
        getData();
        
    }, [])

    useEffect(() => {
        const unsubscribe1 = navigation.addListener('didFocus', () => {
          getData();
        });
        return () => unsubscribe1();
      }, []);

    useFocusEffect(
        React.useCallback( () => {
          getData();
            // return 0;
        }, [0])
    );

    const getData=()=>{
        console.log("===>",route.params.service_req_id)
        ConsumerProductdetalis(route.params.service_req_id).then(res => {
            console.log("===>",res)
            if (res.status === 200) {
                setTrackData(res.data.data);
                console.log(TrackData, "resssss");
            }
        })
    }





    function OpenDetail(value) {
        setServiceRequest(false);
        setTechnicianVisit(false);
        setRepairExpected(false);
        setClosureDetail(false);
        setPaymentsDetails(false);
        setViewData(value);
    }
    return (

        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
            <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
                <View style={{
                    height: "8%", width: Width, flexDirection: "row",
                    borderBottomWidth: 1, borderBottomColor: 'gray',

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
                                name="chevron-back-outline"
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "black" }}>Track Service Request</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                        <Ionicons size={30} name="notifications-outline" />
                        <Ionicons size={30} name="location-outline" />
                    </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    {
                        TrackData.map((itm) => (


                            <View style={{ width: '95%', padding: '2%', alignSelf: 'center' }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>#SR{itm.service_req_id}</Text>
                                        <Text style={{ marginTop: '5%', fontSize: 13 }}>Closed On :<Text style={{ fontWeight: 'bold' }}>May 03 2023</Text></Text>
                                    </View>

                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%', paddingLeft: '1%', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Ionicons color="#36A93F" name="ellipse" size={15} onPress={() => { }} />
                                            <TouchableOpacity onPress={() => setServiceRequest(!ServiceRequest)} style={{ flexDirection: 'row', marginLeft: 15 }}>

                                                <Text style={{ fontWeight: 'bold', color: '#1E232C',fontWeight:"500" }}>Service Request Creation</Text>
                                                <Ionicons style={{ marginLeft: '3%' }} name={ServiceRequest ? "chevron-up-outline" : "chevron-down-outline"} size={15} />

                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    {ServiceRequest ?
                                        <View >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 11 }}>
                                                <Ionicons
                                                    style={{ marginTop: 5 }}
                                                    size={20}
                                                    color="#36A93F"
                                                    name="checkmark-outline"
                                                />

                                                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13, color: '#36A93F' }}>SR Details</Text>

                                                </View>
                                            </View>
                                            <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: '#36A93F', marginLeft: 10, paddingLeft: '7%', marginTop: 11 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 13 }}>Device</Text>
                                                    <Text style={{ fontSize: 13 }}>Television</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Brand</Text>
                                                    <Text style={{ fontSize: 13 }}>{itm.brand}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Modal</Text>
                                                    <Text style={{ fontSize: 13 }}>{itm.model_no}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Size</Text>
                                                    <Text style={{ fontSize: 13 }}>{itm.service_req_id}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Warranty Status</Text>
                                                    <Text style={{ fontSize: 13 }}>{itm.warranty_status}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Warranty Untill</Text>
                                                    <Text style={{ fontSize: 13 }}>{moment(itm.warranty_limit).format('DD-MM-yyyy')}</Text>

                                                </View>

                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 21 }}>
                                                <Ionicons
                                                    style={{ marginTop: 5 }}
                                                    size={20}
                                                    color="#36A93F"
                                                    name="checkmark-outline"
                                                />

                                                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13, color: '#36A93F' }}>complaint Details</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: '#36A93F', marginLeft: 10, paddingLeft: '7%', marginTop: 10 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Type of Damage</Text>
                                                    <Text style={{ fontSize: 13, marginTop: 3 }}>{itm.damage}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Description</Text>
                                                    <Text style={{ fontSize: 13 }}>{itm.damage_description}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13 }}>Attachments</Text>
                                                    <Text style={{ fontSize: 13 }}>{itm.service_req_id}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ height: 20, width: '98%', borderLeftWidth: 1, borderLeftColor: '#36A93F', marginLeft: 10, marginTop: ServiceRequest ? '2%' : '1%' }}></View>
                                    }
                                    <View style={{ flexDirection: 'row', paddingLeft: '1%', alignItems: 'center', marginTop:ServiceRequest ? 22 :0, justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Ionicons color={itm.is_accepted !== 0 ? '#36A93F' : 'orange'} name="ellipse" size={15} onPress={() => { }} />
                                            <TouchableOpacity onPress={() => setTechnicianVisit(!TechnicianVisit)} style={{ flexDirection: 'row', marginLeft: 15 }}>
                                                <Text style={{ color: '#1E232C',fontWeight:"500", fontSize: 13 }}>Technician Visit</Text>
                                                <Ionicons style={{ marginLeft: '3%' }} name={TechnicianVisit ? "chevron-up-outline" : "chevron-down-outline"} size={15} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ fontSize: 13, textAlign: 'right' }}>15 min ago</Text>
                                    </View>
                                    {TechnicianVisit ?

                                        <View style={{ marginTop: ServiceRequest ? null : 11 }}>
                                            {
                                                itm.status == "Accepted" &&
                                                <View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Ionicons
                                                            style={{ marginTop: 5 }}
                                                            size={20}
                                                            color="#36A93F"
                                                            name="checkmark-outline"
                                                        />

                                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: '2%' }}>
                                                            <Text style={{ fontSize: 13, color: itm.tech_visit !== "" ? '#36A93F' : 'orange' }}>Visit Slot</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: itm.tech_visit !== "" ? '#36A93F' : 'orange', marginLeft: 10, paddingLeft: '7%', marginTop: '2%' }}>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 13 }}>Confirm Slot</Text>
                                                            <Text style={{ fontSize: 13 }}>{itm.slots}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '2%' }}>
                                                        <Ionicons
                                                            style={{ marginTop: 5 }}
                                                            size={20}
                                                            color={itm.is_accepted !== "" ? '#36A93F' : 'orange'}
                                                            name="checkmark-outline"
                                                        />

                                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 13, color: itm.is_accepted !== "" ? '#36A93F' : 'orange' }}>Technician Accecpted</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: itm.is_accepted !== 0 ? '#36A93F' : 'orange', marginLeft: 10, paddingLeft: '7%', marginTop: 19 }}>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View>
                                                                <Text style={{ fontSize: 13 }}>Technician accecpted </Text>
                                                                <Text style={{ fontSize: 13 }}>your request</Text>
                                                            </View>
                                                            <Text onPress={() => this.RBSheet.open()}
                                                                style={{ fontSize: 13, textDecorationLine: "underline" }}>View Details</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            }

                                            {
                                                itm.status == "Pending" &&
                                                <View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Ionicons
                                                            style={{ marginTop: 5 }}
                                                            size={20}
                                                            color="#36A93F"
                                                            name="checkmark-outline"
                                                        />

                                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: '2%' }}>
                                                            <Text style={{ fontSize: 13, color: itm.tech_visit !== "" ? '#36A93F' : 'orange' }}>Visit Slot</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: itm.tech_visit !== "" ? '#36A93F' : 'orange', marginLeft: 10, paddingLeft: '7%', marginTop: '2%' }}>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 13 }}>Confirm Slot</Text>
                                                            <Text style={{ fontSize: 13 }}>{itm.slots}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '2%' }}>
                                                        <Ionicons
                                                            style={{}}
                                                            size={20}
                                                            color={'orange'}
                                                            name="checkmark-outline"
                                                        />

                                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 13, color: 'orange' }}>Technician Confimation pending</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: 'orange', marginLeft: 10, paddingLeft: '7%', marginTop: '2%' }}>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View>
                                                                <Text style={{ fontSize: 13 }}>Please wait your request has been sent and </Text>
                                                                <Text style={{ fontSize: 13 }}>technician yet to confirm it</Text>
                                                            </View>

                                                        </View>
                                                    </View>

                                                </View>
                                            }

                                        </View>
                                        :
                                        <View style={{ height: 20, width: '98%', borderLeftWidth: 1, borderLeftColor: '#36A93F', marginLeft: 10, marginTop: TechnicianVisit ? '0%' : '1%' }}></View>
                                    }

                                    {
                                         itm.status == "Accepted" &&
                                    <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '1%', alignItems: 'center', marginTop: TechnicianVisit ? 28 : '1%' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Ionicons color="#FA9B09" name="ellipse" size={15} onPress={() => { }} />
                                            <TouchableOpacity onPress={() => setRepairExpected(!RepairExpected)} style={{ flexDirection: 'row', marginLeft: 15 }}>
                                                <Text style={{ color: '#1E232C',fontWeight:"500", fontSize: 13 }}>Repair Expected SLA</Text>
                                                <Ionicons style={{ marginLeft: '3%' }} name={RepairExpected ? "chevron-up-outline" : "chevron-down-outline"} size={15} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ fontSize: 13, textAlign: 'right' }}>15 min ago</Text>
                                    </View>
                                    {RepairExpected ?
                                        <View >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                                <Ionicons
                                                    style={{ marginTop: 5 }}
                                                    size={20}
                                                    color="#FA9B09"
                                                    name="checkmark-outline"
                                                />

                                                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: '2%' }}>
                                                    <Text style={{ fontSize: 13, color: '#FA9B09' }}>Expected SLA</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '98%', borderLeftWidth: 2, borderLeftColor: '#FA9B09', marginLeft: 10, paddingLeft: '7%', marginTop: '2%' }}>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 13 }}>Yourdevice will be ready</Text>
                                                    <Text style={{ fontSize: 13 }}>in 48 hours</Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ height: 20, width: '98%', borderLeftWidth: 1, borderLeftColor: '#FA9B09', marginLeft: 10, marginTop: RepairExpected ? '2%' : '1%' }}></View>
                                    }
                                    </View>

                                   }






                                    <RBSheet

                                        ref={ref => {
                                            this.RBSheet = ref;
                                        }}
                                        height={375}
                                        openDuration={250}
                                        customStyles={{

                                            container: {

                                                borderTopLeftRadius: 50,
                                                borderTopRightRadius: 50,
                                            }
                                        }}
                                    >
                                        <View style={{ height: "100%", marginLeft: 26, marginRight: 26 }}>
                                            {console.log("itm===>", itm.tech_id)}
                                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                                                <View style={{ height: 6, marginTop: 5, width: 60, borderRadius: 25, backgroundColor: "grey" }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                                <View style={{ flex: 0.3 }}>

                                                </View>
                                                <View style={{ flex: 0.5, }}>
                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Technican Details</Text>

                                                </View>
                                                <View style={{ flex: 0.2, alignItems: "flex-end", }}>
                                                    <AntDesign onPress={() => this.RBSheet.close()}
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
                                                    <Text style={{ fontSize: 11, color: "#6A707C" }}>TCS{itm.tech_id}</Text>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: 'black' }}>{itm.tech_name}</Text>
                                                    <Text>
                                                        <Text style={{ fontSize: 18, color: "#FFDC2B", }}>★★★★★   </Text>
                                                        <Text style={{ fontSize: 11, }}>{"4.2(198)"}</Text>
                                                    </Text>

                                                    <Text style={{ fontSize: 13, textDecorationLine: "underline", color: "#6495ED", marginTop: 12 }}>+91 {itm.tech_mobileno}</Text>


                                                </View>

                                            </View>
                                            <View style={{ height: "25%", borderWidth: 1, borderColor: "#D3D3D3" }}>
                                                <TextInput
                                                    multiline
                                                    style={{ height: "100%", width: "100%", textAlignVertical: 'top' }}
                                                    placeholder=' Type your notes for the technician here'
                                                    placeholderTextColor={"#D3D3D3"}

                                                />

                                            </View>
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10 }}>
                                                <TouchableOpacity style={{
                                                    height: 40, width: 120, backgroundColor: "#D3D3D3",
                                                    alignItems: "center", justifyContent: 'center', borderRadius: 120 / 2
                                                }}>
                                                    <Text style={{ color: "#FFFFFF", fontSize: 16 }} >Chat</Text>

                                                </TouchableOpacity>

                                            </View>

                                        </View>
                                        {/* <YourOwnComponent /> */}
                                    </RBSheet>
                                </View>







                            </View>

                        ))
                    }

                </ScrollView>

                <View style={{
                    height: "4%", width: Width, flexDirection: "row",
                    flexWrap: 'wrap',
                    marginHorizontal: 24, marginTop: RepairExpected == true ? 0 : 15,
                    marginBottom:5
                }}>
                    <TouchableOpacity style={{
                        width: '30%', height: '100%', backgroundColor: 'black',
                        borderRadius: 30, justifyContent: 'center', alignItems: 'center',
                    }}>
                        <Text style={{ color: '#FFFFFF' }}>{t('common:cancel')}</Text>
                    </TouchableOpacity>



                </View>
            </View >
        </SafeAreaView >

    );

}
export default TrackserviceRequestproduct;