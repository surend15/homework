
import React, { useRef, useState, useEffect, Component } from 'react'
import {
  View, Text, SafeAreaView, TouchableOpacity,
  Keyboard, ScrollView, Dimensions, TextInput, ActivityIndicator, StyleSheet, FlatList, BackHandler
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { CreateServiceRequestData, HomePageConsumerData, GetRequestDetails } from '../../Service/CustomerService/HomePageService';
// import ReactNativePickerModule, {PickerRef} from 'react-native-picker-module';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { useTranslation } from "react-i18next";

const ConsumerCreateServicePage = ({ navigation, route }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [brandData, setbrandData] = useState([]);
  const [Tvsize, setTvsize] = useState([]);
  const [selectedtvinches, setselectedtvinches] = useState("");
  const [modelListsNew, setmodelListsNew] = useState([]);
  const [modelListsNew1, setmodelListsNew1] = useState([]);
  const [billerValue, setBillerValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  // for store the data
  const[brand,setbrand]=useState('')
  const[modelnumber, setmodelnumber]=useState('')
  const { t, i18n } = useTranslation();

  // For date picker
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const[selecteddate,setselecteddate]=useState('')

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState('1');
  const [brandID, setbrandID] = useState('');
  const [warrantystausvalue, setwarrantystausvalue] = useState('')

  const [warrantystatus,setwarrantystatus] = useState([  
    {
      label: "Active",
    },
    {
      label: "Inactive",
    }

  ]);

  useEffect(() => {
   
    console.log("===>qwe",brand, route.params?.ApplianceID, route.params?.loginconsumerID, route.params?.labourFee)
    HomeConsumerData(route.params?.ApplianceID);
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
  }, []);

  const handleBackButton = () => {
    // navigation.goBack();
    navigation.jumpTo('Home')
    return true;
}

useEffect(() => {
    const unsubscribe1 = navigation.addListener('focus', () => {
      // console.log("Refresh home page focus on == > ")
      HomeConsumerData(route.params?.ApplianceID);
    });
    return () => unsubscribe1();
  }, []);
 
  const registerforcreate=()=>{
    console.log("brand==>",brand)
    if (brand == "") {
      Toast.show('Pls select the brand', Toast.LONG); 
    }
    else if (modelnumber == "") {
      Toast.show('Pls select the Model number.', Toast.LONG); 
    }
    else if (selectedtvinches == "") {
      Toast.show('Pls select the Tv sizes.', Toast.LONG); 
    }
    else if (warrantystausvalue == "") {
      Toast.show('Pls select the warranty status.', Toast.LONG); 
    }
    else if (selecteddate == "") {
      Toast.show('Pls select the waranty until.', Toast.LONG); 
    }
    else{
      navigation.navigate('ConsumerDetailsservice',{
        brand:brand,
        modelnumber:modelnumber,
        tvsize:selectedtvinches,
        warrantystatus:warrantystausvalue,
        untildate:selecteddate,
        ApplianceID:route.params?.ApplianceID,
        loginconsumerID:route.params?.loginconsumerID,
        labourFee:route.params?.labourFee
      })
      setbrandData([])
      setbrand("")
      setmodelnumber("")
      setmodelListsNew1([])
      setselectedtvinches("")
      setwarrantystausvalue("")
      
      setselecteddate("")
    }

  }

  const HomeConsumerData = (name) => {
    GetRequestDetails(name).then((result) => {
      let responseJson = result;
      console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data))
      if (responseJson.data.status == "200") {
        // Toast.show(responseJson.data.message, Toast.LONG);
        let data = [];
        let data1 = [];
        console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data[0].brandLists))
        console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data[0].capacityDetails))
        setTvsize(responseJson.data.data[0].capacityDetails)
        let NewBrand = responseJson.data.data[0].brandLists;
        let NewModel = responseJson.data.data[0].modelLists;
        if (Array.isArray(NewBrand) && NewBrand.length > 0) {
          for (var i = 0; i < NewBrand.length; i++) {
            data.push({
              label: NewBrand[i].brand_name,
              value: NewBrand[i].brand_id,
            });
          }
          console.log("billervalue ==> ", JSON.stringify(data));

          setbrandData(data)
          console.log("billervalue ==> ", brandData);
        }

        if (Array.isArray(NewModel) && NewModel.length > 0) {
          for (var i = 0; i < NewModel.length; i++) {
            data1.push({
              label: NewModel[i].model_number,
              value: NewModel[i].brand_id,
            });
          }
          console.log("billervalue ==> ", JSON.stringify(data1));

          setmodelListsNew(data1)
          console.log("setmodelListsNew ==> ", modelListsNew);
        }

        // setbrandData(responseJson.data.data)
      } else if (responseJson.data.status == "400") {
        Toast.show(responseJson.data.message, Toast.LONG);
      } else {
        Toast.show(responseJson.data.message, Toast.LONG);
      }
    })
  }

  const changeBrand = (item1) => {
    console.log("----->", item1.value)
    setbrand(item1.value)
    global.brandID = item1.value
    console.log("===>qwe",brand)
    console.log("global.brandID----->", global.brandID)
    console.log("----->", modelListsNew)
    let data = JSON.parse(JSON.stringify(modelListsNew));
    let value = data
      .filter((item) => item.value == item1.value)
      .map(
        ({
          label,
          value,
        }) => ({
          label,
          value,
        })
      );
    console.log("data----->", value)
    setmodelListsNew1(value)
    global.brandName = value[0].label
    console.log("global.brandName----->", global.brandName)
  }

  return (
    <SafeAreaView style={{ flex: 1, width: Width, height: Height, backgroundColor: '#fff' }}>
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
                onPress={()=>navigation.jumpTo('Home')}
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
              width: 25, height: 25, backgroundColor: '#FFD68A',
              borderRadius: 100, justifyContent: 'center', alignItems: 'center'
            }}>
              <View style={{
                width: 15, height: 15, backgroundColor: 'orange',
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
                width: 15, height: 15, backgroundColor: '#708090',
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
                width: 15, height: 15, backgroundColor: '#708090',
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

          {/* Create a Request */}
          <View style={{
            height: Height * 0.03, marginHorizontal: 15,
            flexDirection: 'row'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('common:television')}</Text>
          </View>

          <View
            style={{
              height: Height * 0.07, alignItems: "center",
              justifyContent: "center", marginTop: 15
            }}
          // onPress={() => pickerRef.current.show()}
          >
            <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={brandData}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Brand' : 'Select Brand'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item1 => {
                  changeBrand(item1)
                  // setValue1(item1.value);
                  // setIsFocus(false);
                  // console.log("Values ==> ", value1)
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              height: Height * 0.07, alignItems: "center",
              justifyContent: "center", marginTop: 20
            }}>
            <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
              <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                <Text style={{ fontSize: 10, color: "black" }}>  {t('common:model_number')}  </Text>
              </View>

              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={modelListsNew1}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus1 ? 'Select Model' : 'Select Model'}
                searchPlaceholder="Search..."
                // value={value1}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item1 => {
                  console.log("===>",item1)
                  setmodelnumber(item1.label)
                }}
              />

              <View style={{ height: "100%", width: "15%", alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  size={20}
                  color="black"
                  name="caret-down-outline"
                />
              </View>

            </View>
          </TouchableOpacity>

          <View
            style={{
              height: Height * 0.07, alignItems: "center", paddingLeft: 10,
              justifyContent: "center", marginTop: 20, flexDirection: "row"
            }}
          >
            <View style={{ flex: 0.6 }}>
              <FlatList
                style={{ height: "100%" }}
                data={Tvsize}
                horizontal
                renderItem={({ item, index }) =>
                  <View style={{ width: 55 }}>
                    <TouchableOpacity onPress={() => setselectedtvinches(item.variants)}
                      style={{
                        height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                        alignItems: "center", justifyContent: "center", backgroundColor: selectedtvinches == item.variants ? '#ED9121' : '#FFFFFF',
                      }}>
                      <Text style={{ fontSize: 16, color: selectedtvinches == item.variants ? "#FFFFFF" : "black" }}>{item.variants}"</Text>
                    </TouchableOpacity>

                  </View>
                  // console.log(item.variants)

                }

              />

            </View>

            {/* <View style={{ flex: 0.15 }}>
              <View style={{
                height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                alignItems: "center", justifyContent: "center"
              }}>
                <Text style={{ fontSize: 16, color: "black" }}>32"</Text>
              </View>
            </View>
            <View style={{ flex: 0.15 }}>
              <View style={{
                height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                alignItems: "center", justifyContent: "center"
              }}>
                <Text style={{ fontSize: 16, color: "black" }}>40"</Text>
              </View>
            </View>
            <View style={{ flex: 0.15, }}>
              <View style={{
                height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                alignItems: "center", justifyContent: "center",
                backgroundColor: "#ED9121"
              }}>
                <Text style={{ fontSize: 16, color: "#FFFFFF" }}>55"</Text>
              </View>
            </View>
            <View style={{ flex: 0.15 }}>
              <View style={{
                height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                alignItems: "center", justifyContent: "center"
              }}>
                <Text style={{ fontSize: 16, color: "black" }}>65"</Text>
              </View>
            </View> */}
            <View  style={{ flex: 0.05 }} />
            <View style={{ flex: 0.3 }}>
              <View style={{
                height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8,
                flexDirection: "row"
              }}>
                <View style={{ flex: 0.7, justifyContent: "center" }}>
                  <Text style={{ color: "black" }}>  Others</Text>
                </View>
                <View style={{ flex: 0.3, justifyContent: "center" }}>
                  <MaterialIcons size={26} 
                    color="black"
                    name="arrow-drop-down" />
                </View>

              </View>
            </View>

          </View>


          <View
            style={{
              height: Height * 0.07, alignItems: "center",
              justifyContent: "center", marginTop: 20
            }}

          >
            <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
              <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                <Text style={{ fontSize: 10, color: "black" }}>  {t('common:warranty_status')} </Text>
              </View>

              {/* <Dropdown
                style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={warrantystatus}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus2 ? 'Select Warranty Status' : 'Select Warranty Status'}
                searchPlaceholder="Search..."
                value={value1}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item1 => {
                  setwarrantystausvalue(item1.label)
                  // setValue1(item1.value);
                  // setIsFocus(false);
                  // console.log("Values ==> ", value1)
                }}
              /> */}

              <Dropdown
                style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={warrantystatus}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus2 ? 'Select Warranty Status' : 'Select Warranty Status'}
                searchPlaceholder="Search..."
                  value={value1}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item1 => {
                  console.log("item===>", item1.label),
                    setwarrantystausvalue(item1.label)
                }}
              />
            </View>
          </View>

          <View
            style={{
              height: Height * 0.07, alignItems: "center",
              justifyContent: "center", marginTop: 20
            }}

          >
            <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
              <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                <Text style={{ fontSize: 10, color: "black" }}>  {t('common:warranty_until')} </Text>
              </View>
              <View style={{ height: "100%", width: "85%", justifyContent: "center", paddingLeft: 15 }}>
                <Text style={{ color: "black" }}>{selecteddate == ''? "Select date" :selecteddate}</Text>
              </View>
              <View style={{ height: "100%", width: "15%", alignItems: "center", justifyContent: "center" }}>
                <EvilIcons size={24} onPress={() => setOpen(true)}
                  color="#ED9121"
                  name="calendar" />
              </View>
            </View>

          </View>


          <View
            style={{
              height: Height * 0.04,

            }}
          />



          <DatePicker
            modal
            open={open}
            date={date}
            mode='date'
            minimumDate={new Date()}
            
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              let datee = moment(date).format('yyyy-MM-DD')
                       setselecteddate(datee)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

        </ScrollView>
        
        <View style={{ height: Height * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "center" ,position:"absolute",bottom:0}}>
            <View style={{ height: '95%', width: "100%", alignItems: "center", justifyContent: 'center', elevation: 3, flexDirection: "row", }}>

              <View style={{ height: "100%", width: "47%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity style={{ height: "90%", width: "90%", borderRadius: 8, alignItems: "center", justifyContent: 'center', borderWidth: 1 }}>

                  <Text style={{ color: "black" }}>Cancel</Text>

                </TouchableOpacity>

              </View>
              <View style={{ height: "100%", width: "48%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={()=>registerforcreate()}
                style={{ height: "90%", width: "90%", borderRadius: 8, backgroundColor: "#ED9121", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#FFFFFF" }}>Register</Text>
                </TouchableOpacity>

              </View>
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
export default ConsumerCreateServicePage;

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