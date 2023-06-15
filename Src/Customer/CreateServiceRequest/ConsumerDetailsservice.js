import React, { useRef, useState, useEffect, Component } from 'react'
import {
    View, Text, SafeAreaView, TouchableOpacity,
    Keyboard, ScrollView, Dimensions, TextInput, ActivityIndicator, StyleSheet, FlatList
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
import { CreateServiceRequestData, GetRequestDetails } from '../../Service/CustomerService/HomePageService';
import Toast from 'react-native-simple-toast';
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { useTranslation } from "react-i18next";
const options = {
    title: 'Pick an Image',
    takePhotoButtonTitle: 'Take a Photo',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
    mediaType: 'mixed',
    durationLimit: 60,
    // quality: '1',
    videoQuality: 'low',
    maxWidth: 800,
    maxHeight: 800,
};

const ConsumerDetailsservice = ({ navigation, route }) => {

    const [damagedata, setdamagedata] = useState([]);
    const [damagevalue, setdamagevalue] = useState([]);
    const [description, setdescription] = useState('');
    const [avatarSource, setavatarSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const[value,setValue]=useState('')
    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log('params==>', route.params?.untildate, route.params?.ApplianceID);
        HomeConsumerData(route.params?.ApplianceID);

    }, []);



    const HomeConsumerData = (name) => {
        GetRequestDetails(name).then((result) => {
            let responseJson = result;
            console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.status == "200") {
                // Toast.show(responseJson.data.message, Toast.LONG);
                let data = [];
                let data1 = [];
                console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data[0].damageLists))
                setdamagedata(responseJson.data.data[0].damageLists)
                // console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data[0].capacityDetails))

            }
        })

    }

    // Gallery Open image picker
    const SelectGalleryOpen = () => {
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = { uri: response.assets[0].uri };
                // console.log(source);
                let array = [...avatarSource]
                let obj = {}
                if (response.assets[0].type.includes('image')) {
                    //image
                    obj = {
                        uri: response.assets[0].uri,
                        type: 'image/jpeg',
                        name: 'file.jpg',
                    }

                    array.push(obj)
                    setavatarSource(array)
                    global.imageArray = array
                    // this.setState({
                    //     avatarSource: array,
                    // });
                } else if (response.assets[0].type.includes('video')) {
                    obj = {
                        uri: response.assets[0].uri,
                        type: 'video/mp4',
                        name: new Date().getTime() + '.mp4',
                    }

                    array.push(obj)
                    setavatarSource(array)
                    global.imageArray = array
                    // this.setState({
                    //     avatarSource: array,
                    // });

                }
                console.log("All image check ==> ", global.imageArray);
            }
        })
    }

    const RegisterDetails = () => {
        setIsLoading(true)
        if (damagevalue == '') {
            Toast.show('Pls select the damage type', Toast.LONG);
            setIsLoading(false)
        }
        else if (description == '') {
            Toast.show('Pls enter the Description', Toast.LONG);
            setIsLoading(false)
        }
        else {
            // let sampleFile= new FormData();
            setIsLoading(false)
            for (let index = 0; index < avatarSource.length; index++) {
                // sampleFile.append('images', avatarSource[index])
                // console.log("Image all ===> ", avatarSource[index])

            }
            console.log("Image all check===> ", avatarSource)

            navigation.navigate("ConsumerConfirmservice", {
                brand: route.params?.brand,
                modelnumber: route.params?.modelnumber,
                tvsize: route.params?.tvsize,
                warrantystatus: route.params?.warrantystatus,
                untildate: route.params?.untildate,
                damagevalue: damagevalue,
                description: description,
                ApplianceID: route.params?.ApplianceID,
                loginconsumerID: route.params?.loginconsumerID,
                demageImage : avatarSource,
                labourFee:route.params?.labourFee
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, width: Width, height: Height, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, height: Height, width: Width, backgroundColor: "#FFFFFF" }}>
                {/* Header */}
                <View style={{ height: Height*0.07, flexDirection: "row", elevation: 3, backgroundColor: "#FCFCFC" }}>
                    <View style={{
                        flex: 0.15, alignItems: "center", justifyContent: 'center',
                        marginLeft: 10
                    }}>
                        <View style={{
                            height: "70%",
                            width: "70%", alignItems: "center", justifyContent: "center"
                        }}>
                            <Ionicons
                                onPress={()=>navigation.pop()}
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
                <ScrollView  keyboardShouldPersistTaps={'handled'}>
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
                            width: 25, height: 25, backgroundColor: '#FFD68A',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                        }}>
                            <View style={{
                                width: 15, height: 15, backgroundColor: '#FA9B09',
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
                            width: 25, height: 25, backgroundColor: '#e0e0e0',
                            borderRadius: 100, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <View style={{
                                width: 15, height: 15, backgroundColor: '#8391A1',
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
                        flexDirection: 'row'
                    }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'black' }}>{t('common:repair_details')}?</Text>
                    </View>

                    <View
                        style={{
                            height: Height * 0.07, alignItems: "center",
                            justifyContent: "center", marginTop: 20
                        }}>
                        <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>

                            <Dropdown
                                style={[styles.dropdown,]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={damagedata}
                                // search
                                maxHeight={300}
                                labelField="damage"
                                valueField="value"
                                placeholder={!isFocus?'Select Damage':'Select Damage'}
                                searchPlaceholder="Search..."
                                  value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item1 => {
                                    setdamagevalue(item1.id)
                                    // setValue1(item1.value);
                                    // setIsFocus(false);
                                    // console.log("Values ==> ", value1)
                                }}
                            />
                            {/* <View style={{ height: "100%", width: "85%", justifyContent: "center", paddingLeft: 15 }}>
                                <Text style={{ color: "black", fontSize: 16 }}>Type of Damage</Text>
                            </View>
                            <View style={{ height: "100%", width: "15%", alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons size={26}
                                    color="black"
                                    name="arrow-drop-down" />
                            </View> */}
                        </View>

                    </View>

                    <View
                        style={{
                            height: Height * 0.3, alignItems: "center",
                            justifyContent: "center", marginTop: 20
                        }}

                    >
                        <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                <Text style={{ fontSize: 10, color: "black" }}>{t('common:description')}</Text>
                            </View>
                            <TextInput
                        
                                multiline
                                placeholder='Giving more details on malfunction/damage will be really helpul to us..'
                                style={{ height: "100%", width: "100%", textAlignVertical: 'top',marginLeft:4 }}
                                onChangeText={(text) => setdescription(text)}
                                value={description}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            height: Height * 0.07, alignItems: "center",
                            justifyContent: "center", marginTop: 5
                        }}

                    >
                        <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                <Text style={{ fontSize: 10, color: "black" }}>{t('common:attachments')}</Text>
                            </View>
                            <View style={{ height: "100%", width: "85%", justifyContent: "center", paddingLeft: 15 }}>
                            <FlatList
                                                horizontal
                                                data={avatarSource}
                                                style={{}}
                                                scrollEnabled={true}
                                                initialNumToRender={10}
                                                renderItem={({ item, index }) =>
                                                    <View style={{ justifyContent: 'center' }}>
                                                        <Text>{item.name}, </Text>
                                                    </View>

                                                } />
                            </View>
                            <View style={{ height: "100%", width: "15%", alignItems: "center", 
                            justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => SelectGalleryOpen()}>
                                    <Entypo size={24}
                                        color="#ED9121"
                                        name="attachment" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                   
                    <View
                        style={{
                            height: Height * 0.02,alignItems:'flex-end',marginRight:24
                        }}
                    >
                        <Text style={{fontSize:10}}>* will support only .jpg,.png,.pdf,.mp3,.mp4</Text>

                    </View>
                    <View
                        style={{
                            height: Height * 0.032,alignItems:'flex-end',marginRight:24
                        }}
                    >
                     

                    </View>
                  
                </View>
                </ScrollView>
            </View>
            <View style={{
                        height: Height * 0.08, flexDirection: "row", alignItems: "center",
                        justifyContent: "center",
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
                                <TouchableOpacity onPress={() => RegisterDetails()}
                                    style={{
                                        height: "90%", width: "90%", borderRadius: 8,
                                        backgroundColor: "#ED9121", alignItems: "center", justifyContent: "center"
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

}
export default ConsumerDetailsservice;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: '100%',
        width: '100%',
        //   borderColor: 'gray',
        //   borderWidth: 0.5,
        //   borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});