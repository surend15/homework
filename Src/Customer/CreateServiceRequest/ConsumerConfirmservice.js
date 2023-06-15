import React, { useRef, useState, useEffect, Component } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity,
    Keyboard, ScrollView, Dimensions, ActivityIndicator, FlatList
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { CreateServiceRequestData } from '../../Service/CustomerService/HomePageService';
import { useTranslation } from "react-i18next"

const ConsumerConfirmservice = ({ navigation, route }) => {
    const [datesInWeek, setDatesInWeek] = useState([]);
    const [tenAM, settenAM] = useState(true);
    const [elevanAM, setelevanAM] = useState(false);
    const [twelvePM, settwelvePM] = useState(false);
    const [onePM, setonePM] = useState(false);
    const [threePM, setthreePM] = useState(false);
    const [FourPM, setFourPM] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [visitdate, setvisitdate] = useState("")
    const [selectslots, setselectedslots] = useState('');
    const { t, i18n } = useTranslation()

    const Availableslots = [
        {
            Slots: "10AM - 11AM"
        },
        {
            Slots: "11AM - 12AM"
        },
        {
            Slots: "12PM - 1PM"
        },
        {
            Slots: "1AM - 2PM"
        },
        {
            Slots: "3PM - 4PM"
        },
        {
            Slots: "4PM - 5PM"
        },
    ]


    useEffect(() => {
        console.log('params==>', route.params?.brand, route.params?.demageImage);
        getCurrentWeek();
    }, [])

    const getCurrentWeek = () => {
        let date = new Date()
        let dates = []

        const currentDate = new Date();

        // Set the desired date
        const desiredDate = new Date();

        // Add six days to the desired date
        for (let index = 0; index < 6; index++) {
           let dateS= desiredDate.setDate(desiredDate.getDate() + 1);
           let highlight = moment(dateS).format('DD-MM-yyyy') == moment(date).format('DD-MM-yyyy')
           dates.push(
                        {
                            date: moment(dateS).format('DD'),
                            name: moment(dateS).format('ddd'),
                            fulldate: moment(dateS).format('yyyy-MM-DD'),
                            viewdate: moment(dateS).format('DD MMM yyyy'),
                            highlight: highlight
                        }
                    )
        }

        console.log("dates===>",dates)
       

        // Output the result
       

        // for (var i = 0; i <= date.getDay(); i++) {
        //     let dateS = new Date(date - i * 24 * 3600 * 1000)

        //     let highlight = moment(dateS).format('DD-MM-yyyy') == moment(date).format('DD-MM-yyyy')

        //         dates.push(
        //             {
        //                 date: moment(dateS).format('DD'),
        //                 name: moment(dateS).format('ddd'),
        //                 fulldate: moment(dateS).format('yyyy-MM-DD'),
        //                 viewdate: moment(dateS).format('DD MMM yyyy'),
        //                 highlight: highlight
        //             }
        //         )



        // }
        // dates = dates.reverse()
        // console.log("==>",dates)
        // let j = 1
        // for (var i = date.getDay() + 1; i <= 5; i++) {
        //     let dateS = new Date(date.getTime() + j * 24 * 3600 * 1000)
        //     j = j + 1
        //     let highlight = moment(dateS).format('DD-MM-yyyy') == moment(date).format('DD-MM-yyyy')

        //         dates.push(
        //             {
        //                 date: moment(dateS).format('DD'),
        //                 name: moment(dateS).format('ddd'),
        //                 fulldate: moment(dateS).format('yyyy-MM-DD'),
        //                 viewdate: moment(dateS).format('DD MMM yyyy'),
        //                 highlight: highlight
        //             }
        //         )



        // }
        // console.log("dates======>",dates);
        setDatesInWeek(dates)
    }

    const Servicerequestconfirm = () => {
        setIsLoading(true)
        if (visitdate == "") {
            Toast.show('Pls select the Technician Visit date', Toast.SHORT)
            setIsLoading(false)
        }
        if (selectslots == "") {
            Toast.show('Pls select the Available Slots', Toast.SHORT)
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            let sampleFile = new FormData();
            sampleFile.append('user_id', route.params?.loginconsumerID)
            // sampleFile.append('tech_id',5)
            sampleFile.append('service_id', route.params?.ApplianceID)
            sampleFile.append('brand', route.params?.brand)
            sampleFile.append('model_number', route.params?.modelnumber)
            sampleFile.append('variants', route.params?.tvsize)
            sampleFile.append('warranty_status', route.params?.warrantystatus)
            sampleFile.append('warranty_limit', route.params?.untildate)
            sampleFile.append('damage_id', route.params?.damagevalue)
            sampleFile.append('damage_description', route.params?.description)
            sampleFile.append('tech_visit', visitdate)
            sampleFile.append('slots', selectslots)
            sampleFile.append('labour_fee', route.params?.labourFee)
            sampleFile.append('images', route.params?.demageImage)

            console.log('samplefile', JSON.stringify(sampleFile));

            CreateServiceRequestData(sampleFile).then((responseJson) => {
                setIsLoading(false)
                console.log("responseJson", responseJson.data.message);
                if (responseJson.data.status == 200) {
                    Toast.show(responseJson.data.message, Toast.LONG);
                    navigation.navigate('Home', { screen: 'HomePageConsumer' });
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
    }
    return (
        <SafeAreaView style={{ flex: 1, width: Width, height: Height, backgroundColor: '#fff' }}>
            <View style={{ height: Height, width: Width, backgroundColor: "#FFFFFF" }}>
                <View style={{ height: "8%", flexDirection: "row", elevation: 3, backgroundColor: "#FCFCFC" }}>
                    <View style={{
                        flex: 0.15, alignItems: "center", justifyContent: 'center',
                        marginLeft: 10
                    }}>
                        <View style={{
                            height: "70%",
                            width: "70%", alignItems: "center", justifyContent: "center"
                        }}>
                            <Ionicons
                                onPress={() => navigation.pop()}
                                size={26}
                                color="black"
                                name="chevron-back"
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{t('common:service_request')}</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                        <Ionicons size={30} name="notifications-outline" />
                        <Ionicons size={30} name="location-outline" />
                    </View>

                </View>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{ height: "92%", width: Width, }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24,
                        justifyContent: 'space-between', marginTop: 15
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('common:create_service_request')}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginHorizontal: 24,
                        justifyContent: 'space-between', marginTop: 5
                    }}>
                        <Text style={{ fontSize: 16 }}>{t('common:create_Page_text')}.</Text>
                    </View>

                    <View style={{
                        height: Height * 0.05, marginHorizontal: 24,
                        flexDirection: 'row', alignItems: 'center', marginTop: 20
                    }}>
                        <View style={{
                            width: 25, height: 25, backgroundColor: '#daedf4',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <View style={{
                                width: 15, height: 15, backgroundColor: '#35C2C1',
                                borderRadius: 100
                            }}>

                            </View>
                        </View>

                        <View style={{
                            width: '40%', height: '50%',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                height: 0.5,
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: 'gray',
                            }}>
                            </View>
                        </View>

                        <View style={{
                            width: 25, height: 25, backgroundColor: '#daedf4',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <View style={{
                                width: 15, height: 15, backgroundColor: '#35C2C1',
                                borderRadius: 100
                            }}>

                            </View>
                        </View>

                        <View style={{
                            width: '40%', height: '50%',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                height: 0.5,
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: 'gray',
                            }}>
                            </View>
                        </View>

                        <View style={{
                            width: 25, height: 25, backgroundColor: '#FFD68A',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <View style={{
                                width: 15, height: 15, backgroundColor: '#FA9B09',
                                borderRadius: 100
                            }}>

                            </View>
                        </View>

                    </View>

                    <View style={{
                        height: Height * 0.05, marginHorizontal: 15,
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <Text>{t('common:create')}</Text>
                        <Text style={{ marginLeft: 20 }}>{t('common:details')}</Text>

                        <Text style={{ marginRight: 1 }}>{t('common:confirm')}</Text>
                    </View>

                    <View style={{
                        height: Height * 0.03, marginHorizontal: 24,
                        flexDirection: 'row', marginTop: 20
                    }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'black' }}>{t('common:technician_visit_on')}</Text>
                    </View>

                    <View style={{
                        height: Height * 0.1,width:Width,
                         flexDirection: "row",marginLeft:20,marginRight:22
                    }}>
                        <FlatList
                            style={{ height: "100%",marginTop: 5}}
                            data={datesInWeek}
                            scrollEnabled={true}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            
                            renderItem={({ item, index }) =>
                                <View style={{ width: 58 }}>
                                    <TouchableOpacity onPress={() => setvisitdate(item.fulldate)
                                    }
                                        style={{
                                            height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 12,
                                            alignItems: "center", justifyContent: "center", backgroundColor: visitdate == item.fulldate ? '#ED9121' : '#FFFFFF'
                                        }}>
                                        <Text style={{ fontSize: 16, color: visitdate == item.fulldate ? '#FFFFFF' : 'black' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 16, color: visitdate == item.fulldate ? '#FFFFFF' : 'black', fontWeight: "bold" }}>{item.date}</Text>
                                    </TouchableOpacity>
                                </View>

                            }
                        />

                    </View>

                    <View style={{
                        height: Height * 0.03, marginHorizontal: 24, marginTop: 20
                    }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'black' }}>{t('common:available_slots')}</Text>
                    </View>
                    <View style={{ height: Height * 0.13, marginTop: 10, marginLeft: 22,marginRight:22 }}>

                        <FlatList
                            style={{ height: "100%" }}

                            data={Availableslots}
                            numColumns={3}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View style={{
                                    height: 45, width: 120, marginTop: 5

                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setselectedslots(item.Slots)
                                            //    console.log("==>",item.Slots)
                                        }}
                                        style={{
                                            height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                            alignItems: "center", justifyContent: "center", backgroundColor: selectslots == item.Slots ? '#ED9121' : '#FFFFFF'
                                        }}>
                                        <Text style={{ fontSize: 14, color: selectslots == item.Slots ? '#FFFFFF' : 'black' }}>{item.Slots}</Text>
                                    </TouchableOpacity>
                                </View>

                            }

                        />
                        {/* <View style={{ height: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View style={{ flex: 0.3 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settenAM(true), setelevanAM(false), settwelvePM(false),
                                        setonePM(false), setthreePM(false), setFourPM(false)
                                    }}
                                    style={{
                                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                        alignItems: "center", justifyContent: "center", backgroundColor: tenAM == true ? '#ED9121' : '#FFFFFF'
                                    }}>
                                    <Text style={{ fontSize: 14, color: tenAM ? '#FFFFFF' : 'black' }}>10AM - 11AM</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ flex: 0.3 }}>
                                <TouchableOpacity onPress={() => {
                                    settenAM(false), setelevanAM(true), settwelvePM(false),
                                    setonePM(false), setthreePM(false), setFourPM(false)
                                }}

                                    style={{
                                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                        alignItems: "center", justifyContent: "center", backgroundColor: elevanAM == true ? '#ED9121' : '#FFFFFF'
                                    }}>
                                    <Text style={{ fontSize: 14, color: elevanAM ? '#FFFFFF' : 'black' }}>11AM - 12AM</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ flex: 0.3 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settenAM(false), setelevanAM(false), settwelvePM(true),
                                        setonePM(false), setthreePM(false), setFourPM(false)
                                    }}
                                    style={{
                                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                        alignItems: "center", justifyContent: "center", backgroundColor: twelvePM == true ? '#ED9121' : '#FFFFFF'
                                    }}>
                                    <Text style={{ fontSize: 14, color: twelvePM ? '#FFFFFF' : 'black' }}>12PM - 1PM</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                        <View style={{ height: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                            <View style={{ flex: 0.3 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settenAM(false), setelevanAM(false), settwelvePM(false),
                                        setonePM(true), setthreePM(false), setFourPM(false)
                                    }}

                                    style={{
                                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                        alignItems: "center", justifyContent: "center", backgroundColor: onePM ? '#ED9121' : '#FFFFFF'
                                    }}>
                                    <Text style={{ fontSize: 14, color: onePM ? '#FFFFFF' : 'black' }}>1PM - PM</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ flex: 0.3 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settenAM(false), setelevanAM(false), settwelvePM(false),
                                        setonePM(false), setthreePM(true), setFourPM(false)
                                    }}

                                    style={{
                                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                        alignItems: "center", justifyContent: "center", backgroundColor: threePM ? '#ED9121' : '#FFFFFF'
                                    }}>
                                    <Text style={{ fontSize: 14, color: threePM ? '#FFFFFF' : 'black' }}>3PM - 4PM</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ flex: 0.3 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settenAM(false), setelevanAM(false), settwelvePM(false),
                                        setonePM(false), setthreePM(false), setFourPM(true)
                                    }}
                                    style={{
                                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                                        alignItems: "center", justifyContent: "center", backgroundColor: FourPM ? '#ED9121' : '#FFFFFF'
                                    }}>
                                    <Text style={{ fontSize: 14, color: FourPM ? '#FFFFFF' : 'black' }}>4PM - 5PM</Text>
                                </TouchableOpacity>

                            </View>

                        </View> */}

                    </View>

                    <View style={{
                        height: Height * 0.03, marginHorizontal: 24, marginTop: 20
                    }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'black' }}>{t('common:fare_details')}</Text>
                    </View>

                    <View style={{ height: Height * 0.15, marginTop: 5, flexDirection: "row", marginHorizontal: 24 }}>
                        <View style={{ flex: 0.5 }}>
                            <View style={{ flex: 0.3, justifyContent: "center" }}>
                                <Text style={{ fontSize: 16 }}>{t('common:basic_labour_fees')}:</Text>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: "center" }}>
                                <Text style={{ fontSize: 16 }}>{t('common:delivery_charges')}:</Text>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: "center" }}>
                                <Text style={{ fontSize: 16 }}>{t('common:spare_part_charges')}:</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.5 }}>
                            <View style={{ flex: 0.3, justifyContent: "center" }}>
                                <Text style={{ textAlign: "right", fontWeight: 'bold', color: "black" }}>250.00</Text>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: "center" }}>
                                <Text style={{ textAlign: "right", }} >Not calculated yet</Text>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: "center" }}>
                                <Text style={{ textAlign: "right", }}>Not calculated yet</Text>
                            </View>

                        </View>

                    </View>





                  
                   

                </View>
                </ScrollView>
              

            </View>
            <View style={{
                        height: Height * 0.08, flexDirection: "row", alignItems: "center",
                        justifyContent: "center",position:'absolute',bottom:0
                    }}>
                        <View style={{
                            height: '95%', width: "100%", alignItems: "center",
                            justifyContent: 'center', flexDirection: "row",
                            backgroundColor: "#FCFCFC"
                        }}>

                            <View style={{ height: "100%", width: "47%", alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity style={{
                                    height: "90%", width: "90%",
                                    borderRadius: 8, alignItems: "center", justifyContent: 'center', borderWidth: 1
                                }}>

                                    <Text style={{ color: "black" }}>{t('common:cancel')}</Text>

                                </TouchableOpacity>

                            </View>
                            <View style={{ height: "100%", width: "48%", alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => Servicerequestconfirm()}
                                    style={{
                                        height: "90%", width: "90%", borderRadius: 8,
                                        backgroundColor: "#FA9B09", alignItems: "center", justifyContent: "center"
                                    }}>
                                    <Text style={{ color: "#FFFFFF" }}>{t('common:next')}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
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

    );

}
export default ConsumerConfirmservice;