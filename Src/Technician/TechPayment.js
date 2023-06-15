import React, { useState, useEffect } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity,
    Keyboard, ScrollView, Dimensions, ActivityIndicator, FlatList, BackHandler, Image, TextInput, Button
} from 'react-native'
import Toast from 'react-native-simple-toast';

import Ionicons from 'react-native-vector-icons/Ionicons';
//    import { useTranslation } from "react-i18next";
// import CircleProgress from 'react-native-circular-progress-indicator';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import BottomSheet from 'react-native-simple-bottom-sheet';
import { TechPayAdd, TechPayDetail, TechPayGet } from '../Service/TechnicianService/TechnicianHomeServices';

const TechPayment = ({ navigation }) => {
    const [Sheet, setSheet] = useState(false)
    const [A100, setA100] = useState(false)
    const [A250, setA250] = useState(false)
    const [A500, setA500] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [A750, setA750] = useState(false)
    const [payvalue, setpayvalue] = useState(0)
    const [CreditGet, setCreditGet] = useState([])
    const [recall, setrecall] = useState(false)

    useEffect(() => {
        // TechPayGet()
        TechPayDetail()
            .then((result) => {
                console.log("true", result)
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if (responseJson.data.status == 200) {
                    console.log("Check Success")
                    setrecall(false)
                    setCreditGet(responseJson.data.data)
                    Toast.show(responseJson.data.message, Toast.LONG);
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
    }, [recall])
    function payment() {
        // let TechnicianID = await AsyncStorage.getItem('UserIdTechnician')
        let data = { 'type': 'credit', 'amount': payvalue }
        TechPayAdd(data)
            .then((result) => {
                console.log("true", result)
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if (responseJson.data.status == 200) {
                    console.log("Check Success")
                    setrecall(true)
                    console.log(savepay, 'saveee');
                    Toast.show(responseJson.data.message, Toast.LONG);
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
            <View style={{ height: 60, width: '100%', flexDirection: "row", backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Payment</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                    <Ionicons size={30} name="notifications-outline" />
                    <Ionicons size={30} name="location-outline" />
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{ width: '100%', padding: '5%' }}>
                    <TouchableOpacity style={{ width: '100%', height: 123, borderColor: 'red', borderWidth: 1, borderRadius: 10, flexDirection: 'row', padding: '5%' }}>
                        <View style={{ width: '80%', height: '100%', justifyContent: 'space-between' }}>
                            <Text style={{ width: '50%', fontSize: 21, fontWeight: '400' }}>Available Credits in wallet</Text>
                            <Text onPress={() => setSheet(!Sheet)} style={{ fontSize: 15, borderBottomColor: 'black', borderBottomWidth: 1, width: '27%' }}>+Add Credits</Text>
                        </View>
                        <View style={{ width: '20%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}><Text style={{ fontSize: 30 }}>0</Text>.00</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '93%', height: 37, borderColor: 'lightgray', borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '2%' }}>
                            <TextInput style={{ width: '95%', height: '100%', paddingVertical: '-5%' }} placeholder='Search Transaction' />
                            <Ionicons size={15} name="search" />
                        </View>
                        <Ionicons color="black" size={15} name="filter-outline" />
                    </View>
                    {CreditGet.length <= 0 &&
                        <View style={{ marginTop: '5%' }}>
                            <Text >No Transaction Done</Text>
                        </View>
                    }
                    {CreditGet.length > 0 &&
                        CreditGet.map(itm => (
                            <View style={{ width: '100%', height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '2%' }}>
                                <TouchableOpacity style={{ width: 45, height: 45, borderRadius: 50, backgroundColor: '#ffdab9', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15.5, fontWeight: '600', color: 'orange' }}>
                                        {itm.type === 'credit' ? "W" : "SR"}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%' }}>
                                    <View style={{ justifyContent: 'space-between', height: 35 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500' }}>{itm.type}</Text>
                                        <Text style={{ fontSize: 12, fontWeight: '400' }}>Cash{itm.type}</Text>
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>{itm.type == 'credit' ? "+" : "-"}{itm.amount}</Text>
                                </View>

                            </View>
                        ))
                    }
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
            {Sheet &&
                <BottomSheet
                    isOpen
                    onClose={() => setSheet(!Sheet)}
                >
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
                                Add Credits
                            </Text>
                            <Ionicons onPress={() => { setSheet(false), setpayvalue(0) }} style={{ position: 'relative', left: 100 }} name="close" size={17} color="gray" />
                        </View>
                        <Text style={{ fontSize: 15, marginTop: '5%' }}>common text for wallet</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: '5%' }}>
                            <Text onPress={() => { setA100(true), setA250(false), setA500(false), setA750(false), setpayvalue(100) }} style={{ width: '15%', height: 47, borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, textAlign: 'center', textAlignVertical: 'center', backgroundColor: A100 ? "orange" : "white", color: A100 ? "white" : "black", fontWeight: '400' }}>100</Text>
                            <Text onPress={() => { setA100(false), setA250(true), setA500(false), setA750(false), setpayvalue(250) }} style={{ width: '15%', height: 47, borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, textAlign: 'center', textAlignVertical: 'center', backgroundColor: A250 ? "orange" : "white", color: A250 ? "white" : "black", fontWeight: '400' }}>250</Text>
                            <Text onPress={() => { setA100(false), setA250(false), setA500(true), setA750(false), setpayvalue(500) }} style={{ width: '15%', height: 47, borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, textAlign: 'center', textAlignVertical: 'center', backgroundColor: A500 ? "orange" : "white", color: A500 ? "white" : "black", fontWeight: '400' }}>500</Text>
                            <Text onPress={() => { setA100(false), setA250(false), setA500(false), setA750(true), setpayvalue(750) }} style={{ width: '15%', height: 47, borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, textAlign: 'center', textAlignVertical: 'center', backgroundColor: A750 ? "orange" : "white", color: A750 ? "white" : "black", fontWeight: '400' }}>750</Text>
                            <TextInput onBlur={() => { }} onChangeText={(text) => { setA100(false), setA250(false), setA500(false), setA750(false); setpayvalue(text) }} keyboardType='phone-pad' style={{ width: '30%', borderWidth: 1, borderColor: 'lightgray', borderRadius: 10 }} placeholder='EnterAmount' />
                        </View>
                        <TouchableOpacity onPress={payment} style={{ width: '100%', height: 47, justifyContent: 'center', alignItems: 'center', marginTop: '10%', backgroundColor: 'orange', borderRadius: 10 }}>
                            <Text style={{ color: 'white' }}>Pay with UPI {payvalue > 0 ? "(" + payvalue + ")" : ''}</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: '10%', height: '5%' }}></View>
                    </View>
                </BottomSheet>
            }
        </SafeAreaView >
    )
}
export default TechPayment;