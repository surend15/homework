import axios from "axios";
// import Config from 'react-native-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';

let BaseURL = 'http://161.97.72.249:3005/api/v1/s3/';

export async function Login1(inputJson) {
  console.log("userData ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "login", JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    ).then(function (response) {
        resolve(response);
        //    console.log("check====>,",response)
      })
      .catch(function (error) {
        console.log("check====>2,", error.response.data)
        reject(error.response.data);
      });
  });

}

// Login Page API
export async function Login(inputJson) {
  console.log("userData ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "signup", JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    ).then(function (response) {
      resolve(response);
      console.log("check====>1,", response)
    })
      .catch(function (error) {
        console.log("check====>2,", error.response.data)
        reject(error.response.data);
      });
  });
}

// Technician Register

export async function TechRegisterCheck(inputJson) {
  console.log("userData ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "signup", inputJson, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
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

// Forget Password Page API
//    export async function ForgetPassword(inputJson) {
//     console.log("userData ===> ", inputJson)
//  //    const user = await AsyncStorage.getItem('UserToken');
//  return new Promise (async(resolve,reject)=>
//  {
//  await axios.post(BaseURL+"forgot_password", JSON.stringify(inputJson),{
//  headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json',
//                "Access-Control-Allow-Origin": "*",
//              //   "access_token":user
//              }
//          }
// )

// .then(function (response) {
// resolve(response);
// //    console.log("check====>,",response)
// })
// .catch(function (error) {
// reject(error);
// });
// });

// }

// Technician country data Register

export async function TechPageCountryData() {
  //    console.log("userData ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + "country", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    )

      .then(function (response) {
        resolve(response);
        //    console.log("check====>,",response)
      })
      .catch(function (error) {
        reject(error);
      });
  });

}

// Technician state data Register

export async function TechPageStateData(inputJson) {
  console.log("userData ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `states/${inputJson}`, JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    )

      .then(function (response) {
        resolve(response);
            console.log("check====>,",response)
      })
      .catch(function (error) {
        reject(error);
      });
  });

}

// Technician city data Register

export async function TechPageCityData(inputJson) {
  console.log("userData ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.get(BaseURL + `city/${inputJson}`, JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    )

      .then(function (response) {
        resolve(response);
        //    console.log("check====>,",response)
      })
      .catch(function (error) {
        reject(error);
      });
  });

}

// Forget Password Page API
export async function ForgetPassword(inputJson) {
  console.log("userData ForgetPassword===> ", inputJson)
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "forgot_password", JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    ).then(function (response) {
      resolve(response);
      console.log("check====>,", response)
    }).catch(function (error) {
      console.log("check====>2,", error.response.data)
      reject(error.response.data);
    });
  });

}

// consumer otp check
export async function OTPVerifyConsumer(inputJson) {
  console.log("OTP ===> ", inputJson)
  //    const user = await AsyncStorage.getItem('UserToken');
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "otp_verify", JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    ).then(function (response) {
      resolve(response);
      //    console.log("check====>,",response)
    }).catch(function (error) {
      console.log("Error OTP====>,", error.response.data)
      reject(error.response.data);
    });
  });
}

// Consumer Change Password
export async function changePasswordConsumerNew(inputJson) {
  console.log("userData ===> ", inputJson)
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "change_password", JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
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




export async function ResendOtp(inputJson) {
  console.log("userData Resendotp===> ", inputJson)
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + "resend_otp", JSON.stringify(inputJson), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        //   "access_token":user
      }
    }
    ).then(function (response) {
      resolve(response);
      console.log("check====>,", response)
    }).catch(function (error) {
      console.log("check====>2,", error.response.data)
      reject(error.response.data);
    });
  });

}