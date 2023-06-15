import React, { Component, useState, useEffect } from 'react'
import {
    View, Text, DeviceEventEmitter, Image, SafeAreaView, TouchableHighlight,
    Keyboard, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions, TextInput, TouchableOpacity
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { S3_Icon } from '../../assets/index';
import Toast from 'react-native-simple-toast';
// import {  } from '../Service/LoginService';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather'
import { TechPageCountryData, TechPageStateData, TechPageCityData, TechRegisterCheck, Login } from '../Service/LoginService';
// #ED9121
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
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

const Registration = ({ navigation }) => {

    const [username, setusername] = useState("");
    const [emailAddress, setemailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [consumerClick, setconsumerClick] = useState(true);
    const [techClick, settechClick] = useState(false);

    const [CountryData, setCountryData] = useState([]);
    const [StateData, setStateData] = useState([]);
    const [CityData, setCityData] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus1, setIsFocus1] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [isFocus3, setIsFocus3] = useState(false);
    const [gender, setgender] = useState("");
    const [countryvalue, setcountryvalue] = useState("");
    const [statevalue, setstatevalue] = useState("");
    const [cityvalue, setcityvalue] = useState("");
    const [gendervalue, setgendervalue] = useState("");
    const [fullname, setfullname] = useState("");
    // const [emailAddress, setemailAddress] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [fulladdress, setfulladdress] = useState("");
    const [postcode, setpostcode] = useState("");
    const [genderData, setgenderData] = useState([
        { "value": 1, "label": "Male" },
        { "value": 2, "label": "Female" },
        { "value": 3, "label": "Others" }
    ]);
    const [openstart, setOpenstart] = useState(false);
    const [date, setDate] = useState(new Date());
    const [inputDate, setInputDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [avatarSource, setavatarSource] = useState([]);
    const [visible, setvisible] = useState(true);
    const [visible1, setvisible1] = useState(true);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        TechCountryList();
    }, []);


    const AsConsumer = () => {
        setconsumerClick(true)
        settechClick(false)
    }

    const AsTechnician = () => {
        settechClick(true)
        setconsumerClick(false)
    }

    const RegisterNew = () => {
        Keyboard.dismiss();
        console.log("Register")
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setIsLoading(true)
        if (username == "") {
            console.log("username")
            Toast.show('Please Enter Your Username', Toast.LONG);
            setIsLoading(false)
        } else if (emailAddress == "") {
            Toast.show('Please Enter Your EmailAddress', Toast.LONG);
            setIsLoading(false)
        } else if (reg.test(emailAddress) == false) {
            Toast.show('Invalid Email Address', Toast.LONG);
            setIsLoading(false)
        } else if (password == "") {
            Toast.show('Please Enter Your Password', Toast.LONG);
            setIsLoading(false)
        } else if (repassword == "") {
            Toast.show('Please Enter Your Repassword', Toast.LONG);
            setIsLoading(false)
        } else if (password != repassword) {
            Toast.show('Your Password is Incorrect', Toast.LONG);
            setIsLoading(false)
        } else {
            setIsLoading(true)
            let inputJson = {
                role: 1,
                name: username,
                email: emailAddress,
                password: password,
                confirm_password: repassword
            };
            Login(inputJson).then((result) => {
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if (responseJson.data.status == "200") {
                    navigation.navigate('Login');
                    Toast.show(responseJson.data.message, Toast.LONG);
                }
            }).catch((error) => {
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
    }

    const TechCountryList = () => {
        TechPageCountryData().then((result) => {
            let responseJson = result;
            console.log("Success register Forget ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.success == true) {
                let data = [];
                let NewCountry = responseJson.data.data;
                if (Array.isArray(NewCountry) && NewCountry.length > 0) {
                    for (var i = 0; i < NewCountry.length; i++) {
                        data.push({
                            label: NewCountry[i].country_name,
                            value: NewCountry[i].country_id,
                        });
                    }
                    setCountryData(data)
                    console.log("Success register Forget ==> ", JSON.stringify(data))
                }
            } else {
                Toast.show(responseJson.data.message, Toast.LONG);
            }
        })
    }

    // State check
    const stateCheck = (item1) => {
        console.log("stateCheck ==>  ", item1.value)
        let inputJson = {
            country_id: item1.value
        }
        TechPageStateData(item1.value).then((result) => {
            let responseJson = result;
            console.log("Success register Forget ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.success == true) {
                let data = [];
                let NewState = responseJson.data.data;
                if (Array.isArray(NewState) && NewState.length > 0) {
                    for (var i = 0; i < NewState.length; i++) {
                        data.push({
                            label: NewState[i].state_name,
                            value: NewState[i].state_id,
                        });
                    }
                    setStateData(data)
                    console.log("Success state Forget ==> ", JSON.stringify(data))
                }
            } else {
                Toast.show(responseJson.data.message, Toast.LONG);
            }
        })
    }

    // City check
    const cityCheck = (data) => {
        global.stateNew = data.value
        console.log("cityCheck ==>  ", data.value)
        let inputJson = {
            state_id: data.value
        }
        TechPageCityData(data.value).then((result) => {
            let responseJson = result;
            console.log("Success City Data ==> ", JSON.stringify(responseJson.data.data))
            if (responseJson.data.success == true) {
                let data = [];
                let NewCity = responseJson.data.data;
                if (Array.isArray(NewCity) && NewCity.length > 0) {
                    for (var i = 0; i < NewCity.length; i++) {
                        data.push({
                            label: NewCity[i].city_name,
                            value: NewCity[i].city_id,
                        });
                    }
                    setCityData(data)
                    console.log("Success state Forget ==> ", JSON.stringify(data))
                }
            } else {
                Toast.show(responseJson.data.message, Toast.LONG);
            }
        })
    }

    //AllcityCheck data
    const AllcityCheck = (data) => {
        global.cityNew = data.value
        console.log("AllcityCheck ==>  ", data.value)
    }

    //Gender data
    const genderCheck = (data) => {
        global.genderNew = data.label
        console.log("genderCheck ==>  ", data.label)
    }

    // SelectDate check
    const SelectDOBDate = () => {
        setOpenstart(true);
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
                    // this.setState({
                    //     avatarSource: array,
                    // });

                }
                console.log("All image check ==> ", avatarSource);
            }
        })
    }

    // Create Tech Register
    const TechnicianRegisterNew = () => {
        setIsLoading(true)
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (fullname == "") {
            Toast.show('Please Enter Your Fullname', Toast.LONG);
            setIsLoading(false)
        } else if (emailAddress == "") {
            Toast.show('Please Enter Your EmailAddress', Toast.LONG);
            setIsLoading(false)
        } else if (reg.test(emailAddress) == false) {
            Toast.show('Invalid Email Address', Toast.LONG);
            setIsLoading(false)
        } else if (phonenumber == "") {
            Toast.show('Please Enter Your Phonenumber', Toast.LONG);
            setIsLoading(false)
        } else if (phonenumber.length <= 9) {
            Toast.show('Invalid Phone Number', Toast.LONG);
            setIsLoading(false)
        } else if (selectedDate == "") {
            Toast.show('Please Select Date of Birth', Toast.LONG);
            setIsLoading(false)
        } else if (gendervalue == "") {
            Toast.show('Please Select Gender', Toast.LONG);
            setIsLoading(false)
        } else if (countryvalue == "") {
            Toast.show('Please Select Country', Toast.LONG);
            setIsLoading(false)
        } else if (statevalue == "") {
            Toast.show('Please Select State', Toast.LONG);
            setIsLoading(false)
        } else if (fulladdress == "") {
            Toast.show('Please Enter Your Address', Toast.LONG);
            setIsLoading(false)
        } else if (cityvalue == "") {
            Toast.show('Please Select City', Toast.LONG);
            setIsLoading(false)
        } else if (postcode == "") {
            Toast.show('Please Enter Your Postcode', Toast.LONG);
            setIsLoading(false)
        } else if (postcode.length <= 5) {
            Toast.show('Invalid Post Code', Toast.LONG);
            setIsLoading(false)
        } else {
            var sampleFile = new FormData()

            for (let index = 0; index < avatarSource.length; index++) {
                sampleFile.append('images', avatarSource[index])
            }

            sampleFile.append("role", 2)
            sampleFile.append("name", fullname)
            sampleFile.append("email", emailAddress)
            sampleFile.append("mobile_no", phonenumber)
            sampleFile.append("dob", selectedDate)
            sampleFile.append("gender", global.genderNew)
            sampleFile.append("country", 1)
            sampleFile.append("state", global.stateNew)
            sampleFile.append("address", fulladdress)
            sampleFile.append("city", global.cityNew)
            sampleFile.append("postalcode", postcode)
            // sampleFile.append("images", avatarSource)
            setIsLoading(true)
            console.log("All Register check ==> ", JSON.stringify(sampleFile));
            TechRegisterCheck(sampleFile).then((result) => {
                console.log("true", result)
                setIsLoading(false)
                let responseJson = result;
                console.log("Success response login ==> ", JSON.stringify(responseJson.data))
                if (responseJson.data.status == 200) {
                    console.log("Check Success")
                    navigation.navigate('TechnicianPendingApprove');
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

    }

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{ height: Height, width: Width, flex: 1, backgroundColor: "#FFFFFF", }}>
                    <View style={{ height: '110%', width: '100%', flex: 1, backgroundColor: "#FFFFFF", }}>
                        {/* {Header} */}
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
                            <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row-reverse', height: '100%', justifyContent: 'space-evenly' }}>
                      
                        <Ionicons size={30} name="location-outline" />
                    </View>
                        </View>
                        {/* TextInput Area */}
                        <View style={{ height: '93%', margin: 20, }}>
                            <View style={{ height: '5%', width: "100%" }}>
                                <Text style={{ fontSize: 25, color: 'black', fontWeight: "bold" }}>{t('common:hello_reg_get_start')}</Text>
                            </View>

                            <View style={{
                                height: "5%", marginTop: 10, width: Width,
                                marginLeft: -20, flexDirection: 'row',
                            }}>
                                <TouchableOpacity style={{
                                    width: '50%', height: '100%',
                                    justifyContent: 'center', alignItems: 'center', borderRightColor: '#000000',
                                    borderRightWidth: 0.5, borderBottomColor: consumerClick == true ? '#FA9B09' : '#000000',
                                    borderBottomWidth: 0.8
                                }} onPress={() => AsConsumer()}>
                                    <Text style={{ fontSize: 15, color: consumerClick == true ? '#FA9B09' : '#1E232C' }}>{t('common:selectconsumer')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    width: '50%', height: '100%',
                                    justifyContent: 'center', alignItems: 'center', borderRightColor: '#000000',
                                    borderRightWidth: 0.5, borderBottomColor: techClick == true ? '#FA9B09' : '#000000',
                                    borderBottomWidth: 0.8
                                }} onPress={() => AsTechnician()}>
                                    <Text style={{ fontSize: 15, color: techClick == true ? '#FA9B09' : '#1E232C' }}>{t('common:selecttech')}</Text>
                                </TouchableOpacity>
                            </View>

                            {consumerClick == true ?

                                <View style={{ height: "8%", marginTop: 20, margin: 5, }}>
                                    <TextInput
                                        style={{
                                            height: "100%", width: "100%", backgroundColor: "#f9f9f9",
                                            borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10
                                        }}
                                        placeholder='     Username'
                                        onChangeText={username => setusername(username)}
                                        value={username}
                                    />
                                </View>
                                :
                                <View style={{
                                    height: "7.1%", alignItems: "center", justifyContent: "center", marginTop: 20,
                                }}>
                                    <View style={{ height: "95%", width: "100%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8 }}>
                                        <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                            <Text style={{ fontSize: 10, color: "black" }}>{t('common:fullname')}</Text>
                                        </View>
                                        <TextInput
                                            style={{ height: "100%", width: "100%", paddingLeft: 10 }}
                                            onChangeText={fullname => setfullname(fullname)}
                                            value={fullname}
                                        />
                                    </View>
                                </View>
                            }

                            {consumerClick == true ?
                                <View style={{ height: "8%", marginTop: 10, margin: 5, flexDirection: 'row' }}>
                                    <TextInput
                                        style={{
                                            height: "100%", width: "100%", backgroundColor: "#f9f9f9",
                                            borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10
                                        }}
                                        placeholder='     Email'
                                        onChangeText={emailAddress => setemailAddress(emailAddress)}
                                        value={emailAddress}
                                    />
                                </View>
                                :

                                <View style={{ height: "7.1%", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                                    <View style={{ height: "90%", width: "100%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8 }}>
                                        <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                            <Text style={{ fontSize: 10, color: "black" }}> {t('common:email')}  </Text>
                                        </View>
                                        <TextInput
                                            style={{ height: "100%", width: "100%", paddingLeft: 10 }}
                                            onChangeText={emailAddress => setemailAddress(emailAddress)}
                                            value={emailAddress}
                                        />
                                    </View>
                                </View>
                            }

                            {consumerClick == true ?
                                <View style={{ height: "8%", marginTop: 10, margin: 5, }}>
                                    <TextInput
                                        style={{
                                            height: "100%", width: "100%", backgroundColor: "#f9f9f9",
                                            borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10
                                        }}
                                        placeholder='     Password'
                                        onChangeText={password => setPassword(password)}
                                        value={password}
                                        secureTextEntry={visible}

                                    />
                                    <View style={{ position: "absolute", right: 7, top: 20 }}>
                                        <Ionicons onPress={() => setvisible(!visible)}
                                            name={visible ? "eye-off-outline" : "eye-outline"}
                                            size={24}
                                        />
                                    </View>
                                </View>
                                :
                                <View style={{ height: "7.1%", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                                    <View style={{ height: "90%", width: "100%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8 }}>
                                        <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                            <Text style={{ fontSize: 10, color: "black" }}>  {t('common:phone')} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", height: "100%", width: "100%", alignItems: "center" }}>
                                            <View style={{
                                                borderRightWidth: 1, flex: 0.15, height: "60%", borderColor: "#d3d3d3",
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 18 }}>+91</Text>
                                            </View>
                                            <View style={{ flex: 0.9 }}>
                                                <TextInput
                                                    style={{ height: "100%", width: "100%", paddingLeft: 10 }}
                                                    keyboardType="number-pad"
                                                    maxLength={10}
                                                    onChangeText={phonenumber => setphonenumber(phonenumber)}
                                                    value={phonenumber}
                                                />

                                            </View>

                                        </View>

                                    </View>
                                </View>
                            }

                            {consumerClick == true ?
                                <View style={{ height: "8%", marginTop: 10, margin: 5, }}>
                                    <TextInput
                                        style={{
                                            height: "100%", width: "100%", backgroundColor: "#f9f9f9",
                                            borderRadius: 5, borderColor: "#ededed", borderWidth: 1, paddingLeft: 10
                                        }}
                                        placeholder='     Confirm password'
                                        onChangeText={repassword => setrepassword(repassword)}
                                        value={repassword}
                                        secureTextEntry={visible1}
                                    />
                                      <View style={{ position: "absolute", right: 7, top: 20 }}>
                                        <Ionicons onPress={() => setvisible1(!visible1)}
                                            name={visible1 ? "eye-off-outline" : "eye-outline"}
                                            size={24}
                                        />
                                    </View>
                                </View>
                                :
                                <View style={{ height: "7.1%", width: "100%", alignItems: "center", justifyContent: "center", marginTop: 15, flexDirection: "row" }}>
                                    <View style={{
                                        height: "100%", width: "50%", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <View style={{ height: "90%", width: "96%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                                <Text style={{ fontSize: 10, color: "black" }}>{t('common:date_of_birth')}  </Text>
                                            </View>

                                            <View style={{ height: "100%", width: "75%", alignItems: "center", justifyContent: "center" }}>
                                                <Text style={{ color: "black" }}>
                                                    {selectedDate == "" ? "Select Date" : selectedDate}</Text>
                                            </View>
                                            <View style={{ height: "100%", width: "25%", alignItems: "center", justifyContent: "center" }}>
                                                <TouchableOpacity onPress={() => SelectDOBDate()}>
                                                    <EvilIcons size={30}
                                                        color="#ED9121"
                                                        name="calendar" />
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                    </View>
                                    <View style={{ height: "100%", width: "50%", alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ height: "90%", width: "96%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5, }}>
                                                <Text style={{ fontSize: 10, color: "black" }}> {t('common:country')}  </Text>
                                            </View>
                                            <Dropdown
                                                style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                data={CountryData}
                                                containerStyle={{ backgroundColor: '#D3D3D3' }}
                                                // search
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!isFocus1 ? 'Select Country' : 'Select Country'}
                                                searchPlaceholder="Search..."
                                                value={countryvalue}
                                                onFocus={() => setIsFocus1(true)}
                                                onBlur={() => setIsFocus1(false)}
                                                onChange={item1 => {
                                                    setcountryvalue(item1.value)
                                                    stateCheck(item1)
                                                }}
                                            />
                                            {/* <View style={{ height: "100%", width: "75%", justifyContent: "center", paddingLeft: 15 }}>
                                <Text style={{ color: "black" }}>Male</Text>
                            </View>
                            <View style={{ height: "100%", width: "25%", alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons size={26}
                                    color="black"
                                    name="arrow-drop-down" />
                            </View> */}
                                        </View>

                                    </View>
                                </View>

                            }

                            {techClick == true &&
                                <View style={{
                                    height: "7.1%", width: "100%", alignItems: "center", justifyContent: "center",
                                    marginTop: 15, flexDirection: "row"
                                }}>
                                    <View style={{ height: "100%", width: "50%", alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ height: "90%", width: "96%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                                <Text style={{ fontSize: 10, color: "black" }}> {t('common:state')} </Text>
                                            </View>

                                            {/* <View style={{ height: "100%", width: "100%", paddingLeft: 15 }}> */}

                                            <Dropdown
                                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle1}
                                                iconStyle={styles.iconStyle}
                                                data={StateData}
                                                containerStyle={{ backgroundColor: '#D3D3D3' }}
                                                // search
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!isFocus ? 'Select State' : 'Select State'}
                                                searchPlaceholder="Search..."
                                                value={statevalue}
                                                onFocus={() => setIsFocus(true)}
                                                onBlur={() => setIsFocus(false)}
                                                onChange={data => {
                                                    setstatevalue(data.value)
                                                    cityCheck(data)
                                                }}
                                            />
                                            {/* </View> */}
                                            {/* <View style={{ height: "100%", width: "75%", justifyContent: "center", paddingLeft: 15 }}>
                <Text style={{ color: "black" }}>Male</Text>
            </View>
            <View style={{ height: "100%", width: "25%", alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons size={26}
                    color="black"
                    name="arrow-drop-down" />
            </View> */}

                                        </View>

                                    </View>
                                    <View style={{ height: "100%", width: "50%", alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ height: "90%", width: "96%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5, }}>
                                                <Text style={{ fontSize: 10, color: "black" }}>{t('common:gender')} </Text>
                                            </View>
                                            <Dropdown
                                                style={[styles.dropdown, isFocus3 && { borderColor: 'blue' }]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                data={genderData}
                                                containerStyle={{ backgroundColor: '#D3D3D3' }}
                                                // search
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!isFocus3 ? 'Select Gender' : 'Select Gender'}
                                                searchPlaceholder="Search..."
                                                value={gendervalue}
                                                onFocus={() => setIsFocus3(true)}
                                                onBlur={() => setIsFocus3(false)}
                                                onChange={item1 => {
                                                    setgendervalue(item1.value)
                                                    genderCheck(item1)
                                                }}
                                            />
                                        </View>

                                    </View>
                                </View>
                            }

                            {techClick == true &&
                                <View style={{ height: "7.1%", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                    <View style={{ height: "90%", width: "100%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8 }}>
                                        <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                            <Text style={{ fontSize: 10, color: "black" }}> {t('common:street_name')}</Text>
                                        </View>
                                        <TextInput
                                            style={{ height: "100%", width: "100%", paddingLeft: 10 }}
                                            onChangeText={fulladdress => setfulladdress(fulladdress)}
                                            value={fulladdress}
                                        />
                                    </View>
                                </View>
                            }

                            {techClick == true &&
                                <View style={{ height: "7.1%", width: "100%", alignItems: "center", justifyContent: "center", marginTop: 20, flexDirection: "row" }}>
                                    <View style={{ height: "100%", width: "50%", alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ height: "90%", width: "96%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                                <Text style={{ fontSize: 10, color: "black" }}> {t('common:city')}  </Text>
                                            </View>
                                            <Dropdown
                                                style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle1}
                                                iconStyle={styles.iconStyle}
                                                data={CityData}
                                                containerStyle={{ backgroundColor: '#D3D3D3' }}
                                                // search
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!isFocus2 ? 'Select City' : 'Select City'}
                                                searchPlaceholder="Search..."
                                                value={cityvalue}
                                                onFocus={() => setIsFocus2(true)}
                                                onBlur={() => setIsFocus2(false)}
                                                onChange={data => {
                                                    setcityvalue(data.value)
                                                    AllcityCheck(data)
                                                }}
                                            />
                                        </View>

                                    </View>
                                    <View style={{ height: "100%", width: "50%", alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ height: "90%", width: "96%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8 }}>
                                            <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                                <Text style={{ fontSize: 10, color: "black" }}>  {t('common:postal_code')}  </Text>
                                            </View>
                                            <TextInput
                                                style={{ height: "100%", width: "100%", paddingLeft: 10 }}
                                                keyboardType="number-pad"
                                                maxLength={6}
                                                onChangeText={postcode => setpostcode(postcode)}
                                                value={postcode}
                                            />
                                        </View>

                                    </View>
                                </View>

                            }

                            {techClick == true &&
                                <View style={{ height: "7.1%", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                    <View style={{ height: "90%", width: "100%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
                                        <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                                            <Text style={{ fontSize: 10, color: "black" }}>  {t('common:upload_shop_image')}  </Text>
                                        </View>
                                        <View style={{ height: "100%", width: "85%", paddingLeft: 15 }}>
                                            {/* <Text style={{ color: "black" }}>Karur</Text> */}
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
                                        <View style={{ height: "100%", width: "15%", alignItems: "center", justifyContent: "center" }}>
                                            <TouchableOpacity onPress={() => SelectGalleryOpen()}>
                                                <Feather size={24}
                                                    color="#ED9121"
                                                    name="camera" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            }

                            {consumerClick == true ?
                                <View>
                                    {/* Register Button */}
                                    <TouchableHighlight onPress={() => RegisterNew()}
                                        style={{ height: 58, alignItems: "center", justifyContent: "center", backgroundColor: "#ED9121", borderRadius: 8, marginTop: 20 }}>
                                        <Text style={{ color: "#FFFF", fontWeight: 'bold', fontSize: 16 }}>{t('common:register')}</Text>
                                    </TouchableHighlight>
                                </View>
                                :
                                <View style={{ height: "12.1%", width: "100%", alignItems: "center", justifyContent: 'center', flexDirection: "row", elevation: 3 }}>
                                    <View style={{ height: "40%" }} />

                                    <View style={{ height: "60%", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                                        <View style={{ height: "100%", width: "47%", alignItems: "center", justifyContent: "center" }}>
                                            <TouchableOpacity style={{ height: "90%", width: "90%", borderRadius: 8, alignItems: "center", justifyContent: 'center', borderWidth: 1 }}>

                                                <Text style={{ color: "black" }}> {t('common:cancel')}</Text>

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{ height: "100%", width: "48%", alignItems: "center", justifyContent: "center" }}>
                                            <TouchableOpacity onPress={() => TechnicianRegisterNew()}
                                                style={{ height: "90%", width: "90%", borderRadius: 8, backgroundColor: "#ED9121", alignItems: "center", justifyContent: "center" }}>
                                                <Text style={{ color: "#FFFFFF" }}>{t('common:register')}</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            }

                            {consumerClick == true &&
                                <View style={{
                                    height: "13%", flexDirection: "row", alignItems: "center",
                                    marginTop: -10
                                }}>
                                    <View style={{ width: "35%", borderWidth: 0.5, borderColor: "#D3D3D3" }} />
                                    <Text style={{ color: 'black', width: '30%', textAlign: "center" }}>{t('common:or_register_with')}</Text>
                                    <View style={{ width: "35%", borderWidth: 0.5, borderColor: "#D3D3D3" }} />
                                </View>
                            }

                            {/* Social Login Area */}
                            {consumerClick == true &&
                                <View style={{
                                    flexDirection: "row", justifyContent: 'space-between', height: "7%",
                                    marginTop: -10
                                }}>
                                    <View style={{ flex: 0.47, borderWidth: 0.5, borderColor: "#D3D3D3", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                                        <Image
                                            style={{ height: "50%", width: "40%" }}
                                            resizeMode='contain'
                                            source={require('../../assets/facebook.png')}
                                        />
                                    </View>
                                    <View style={{ flex: 0.47, borderWidth: 0.5, borderColor: "#D3D3D3", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                                        <Image
                                            style={{ height: "50%", width: "40%" }}
                                            resizeMode='contain'
                                            source={require('../../assets/Google.png')}
                                        />
                                    </View>

                                </View>
                            }

                            {consumerClick == true &&
                                <View
                                    style={{
                                        height: "7%", marginTop: 10,
                                        alignItems: "center", justifyContent: "center", flexDirection: 'row'
                                    }}>

                                    <Text style={{ fontSize: 16, color: 'black' }}>{t('common:already_message')}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                        <Text style={{ fontSize: 16, color: '#ED9121', }}>
                                            {t('common:login_now')}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {/* <TouchableOpacity onPress={() => navigation.navigate('TechnicianRegister')}
                            style={{ height: "7%", marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text>
                                <Text style={{ fontSize: 20, color: '#ED9121', textDecorationLine: 'underline' }}> Sign up with Technician</Text>
                            </Text>

                        </TouchableOpacity> */}

                        </View>
                    </View>
                </View>
                <DatePicker
                    modal
                    open={openstart}
                    date={date}
                    mode='date'
                    onConfirm={(date) => {
                        setOpenstart(false)
                        let datee = moment(date).format('DD-MM-yyyy')
                        setSelectedDate(datee)
                    }}
                    onCancel={() => {
                        setOpenstart(false)
                    }}
                />
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

}
export default Registration;

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
        fontSize: 15,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    inputSearchStyle1: {
        height: 40,
        fontSize: 16,
        borderColor: 'orange',
    }
});