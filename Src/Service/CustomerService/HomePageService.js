import axios from "axios";
// import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

let BaseURL = 'http://161.97.72.249:3005/api/v1/s3/';


// Home Page Consumer API
export async function 
HomePageConsumerData() {
  let ConsumerUserToken = await AsyncStorage.getItem('UserToken')
  console.log("Home consumer===== >", ConsumerUserToken);
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + "getAppliances", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "access_token": ConsumerUserToken
      }
    }
    ).then(function (response) {
      resolve(response);
      //    console.log("check====>,",response)
    }).catch(function (error) {
      reject(error);
    });
  });

}


// Create Service Request Consumer
export async function CreateServiceRequestData(inputJson) {
  console.log("userData ===> ", inputJson)
  const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "serviceRequest", inputJson, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "access_token": user
      }
    }
    ).then(function (response) {
      console.log("check====>1,", response)
      resolve(response);
    }).catch(function (error) {
      console.log("check====>2,", error.response.data)
      reject(error.response.data);
    });
  });
}


// Home Page Consumer API
export async function GetRequestDetails(name) {
  console.log("GetRequestDetails ==> ", name)
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==> ", user)
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `serviceRequest/${name}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "access_token": user
      }
    }
    ).then(function (response) {
      resolve(response);
      //    console.log("check====>,",response)
    }).catch(function (error) {
      reject(error);
    });
  });

}

export async function Consumerserviceorder() {
  console.log("GetRequestDetails ==> ", )
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==> ", user)
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `serviceOrders/consumer`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "access_token": user
      }
    }
    ).then(function (response) {
      resolve(response);
      //    console.log("check====>,",response)
    }).catch(function (error) {
      reject(error);
    });
  });

}

export async function ConsumerProductdetalis(name) {
  console.log("GetRequestDetails ==> ", )
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==> ", user)
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `serviceOrders/consumer/${name}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "access_token": user
      }
    }
    ).then(function (response) {
      resolve(response);
      //    console.log("check====>,",response)
    }).catch(function (error) {
      reject(error);
    });
  });

}

