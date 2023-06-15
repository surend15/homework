
import React, { useRef, useState, useEffect, Component } from 'react'
import {
  View, Text, SafeAreaView, TouchableOpacity,
  Keyboard, ScrollView, Dimensions, TextInput, ActivityIndicator, StyleSheet
} from 'react-native'
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
// import { CreateServiceRequestData } from './Services/HomeConsumerService'
// import ReactNativePickerModule, {PickerRef} from 'react-native-picker-module';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ConsumerCreateServicePage = ({ }) => {


  // this.pickerRef = React.createRef();
  // const pickerRef = useRef<PickerRef>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [brandData, setbrandData] = useState([]);
  const [modelListsNew, setmodelListsNew] = useState([]);
  const [modelListsNew1, setmodelListsNew1] = useState([]);
  const [billerValue, setBillerValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState('1');
  const [brandID, setbrandID] = useState('');

  useEffect(() => {
    // HomeConsumerData();
  }, []);

  const HomeConsumerData = () => {
    CreateServiceRequestData().then((result) => {
      let responseJson = result;
      console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data))
      if (responseJson.data.status == "200") {
        // Toast.show(responseJson.data.message, Toast.LONG);
        let data = [];
        let data1 = [];
        console.log("Success response Forget ==> ", JSON.stringify(responseJson.data.data[0].brandLists))
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
    global.brandID = item1.value
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
                size={26}
                color="black"
                name="chevron-back"
              />
            </View>
          </View>
          <View style={{ justifyContent: 'center', paddingLeft: 10, }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Service Request</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 24,
            justifyContent: 'space-between', marginTop: 15
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Create Service Request</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 24,
            justifyContent: 'space-between', marginTop: 5
          }}>
            <Text style={{ fontSize: 16 }}>Create your service request by providing all the
              requested details below.</Text>
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
              width: 25, height: 25, backgroundColor: '#FFD68A',
              borderRadius: 100, justifyContent: 'center', alignItems: 'center'
            }}>
              <View style={{
                width: 15, height: 15, backgroundColor: 'orange',
                borderRadius: 100
              }}>

              </View>
            </View>

          </View>

          <View style={{
            height: Height * 0.05, marginHorizontal: 15,
            flexDirection: 'row', justifyContent: 'space-between'
          }}>
            <Text>Create</Text>
            <Text style={{ marginLeft: 20 }}>Details</Text>
            <Text style={{ marginRight: 1 }}>Confirm</Text>
          </View>

        {/* Create a Request */}
          <View style={{
            height: Height * 0.03, marginHorizontal: 15,
            flexDirection: 'row'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Television</Text>
          </View>

          <View
            style={{
              height: Height * 0.07, alignItems: "center",
              justifyContent: "center", marginTop: 20
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
                placeholder={!isFocus && 'Select Brand'}
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
                <Text style={{ fontSize: 10, color: "black" }}>  Modal Number  </Text>
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
              height: Height * 0.07, alignItems: "center",
              justifyContent: "center", marginTop: 20
            }}

          >
            <View style={{ height: "90%", width: "90%", borderWidth: 1, borderColor: "#d3d3d3", borderRadius: 8, flexDirection: "row" }}>
              <View style={{ position: "absolute", backgroundColor: '#FFFFFF', top: -8, left: 5 }}>
                <Text style={{ fontSize: 10, color: "black" }}>  Warranty Status </Text>
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
                <Text style={{ fontSize: 10, color: "black" }}>  Warranty Until </Text>
              </View>
              <View style={{ height: "100%", width: "85%", justifyContent: "center", paddingLeft: 15 }}>
                <Text style={{ color: "black" }}>Karur</Text>
              </View>
              <View style={{ height: "100%", width: "15%", alignItems: "center", justifyContent: "center" }}>
                <EvilIcons size={24}
                  color="#ED9121"
                  name="calendar" />
              </View>
            </View>

          </View>


          <View
            style={{
              height: Height * 0.20, 
         
            }}
          >
           
          </View>
          <View style={{height:Height * 0.08,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
              <View style={{height:'95%',width:"100%",alignItems:"center",justifyContent:'center',elevation:3,flexDirection:"row",}}>
         
                      <View style={{ height: "100%", width: "47%", alignItems: "center", justifyContent: "center" }}>
                          <TouchableOpacity style={{ height: "90%", width: "90%", borderRadius: 8,alignItems:"center" ,justifyContent:'center',borderWidth:1 }}>
                              
                              <Text style={{color:"black"}}>Cancel</Text>
                            
                          </TouchableOpacity>

                      </View>
                      <View style={{ height: "100%", width: "48%", alignItems: "center", justifyContent: "center" }}>
                          <TouchableOpacity style={{ height: "90%", width: "90%",  borderRadius: 8,backgroundColor:"#ED9121", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{color:"#FFFFFF"}}>Register</Text>  
                          </TouchableOpacity>

                      </View>
                    </View>
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