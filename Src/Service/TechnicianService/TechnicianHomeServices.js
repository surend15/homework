import axios from "axios";
// import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
let BaseURL = 'http://161.97.72.249:3005/api/v1/s3/';

// Home Page Technician API
export async function HomePageTechnicianData(TechnicianID) {
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==> ", user)
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `service_orders/${TechnicianID}`, {
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

//Tech payment get
export async function TechPayDetail() {
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==>hi ", user)
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `credit_details`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "access_token": user
      }
    }
    ).then(function (response) {
      console.log(response, "response");
      resolve(response);
      //    console.log("check====>,",response)
    }).catch(function (error) {
      reject(error);
    });
  });
}

//tech update payment
export async function TechPayAdd(data) {
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==>hi ", user, "datta", data)
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + `credit_details`, data, {
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

// Technician Accept Home Page
export async function TechnicianAcceptHome(inputJson) {
  console.log("userData ===> ", inputJson)
  const user = await AsyncStorage.getItem('UserToken');
  console.log("user ==> ", user)
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "service_accept_reject", inputJson, {
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


