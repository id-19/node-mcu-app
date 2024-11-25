const make_query = async (ip_address = esp_local_ip, endpoint= "/") =>{
    let url = `http://${ip_address}${endpoint}`;
    console.log("the url is :" + url);
    let data = await fetch(url).
      // then((res)=>res.data).
      then((res) => {
        console.log("RES:\n"+res)
        console.log(Object.keys(res))
        return res.data
}).
      catch((err)=>{
        console.log("error is: \n" + err);
        return null;
      });
    console.log("Finally, data is " + data);
    return data;
  }

const esp_local_ip = "192.168.8.149"; 

const get_pin_state = async () => {
  let res_obj = await make_query(esp_local_ip, "/status").then((res)=>(res));
  console.log(res_obj);
}

get_pin_state();
// const set_pin_high = async () =>{
//     high_confirmation = await make_query(esp_local_ip, "/high");
//     console.log("Query over");
//     // The pin should automatically become high, we simply retrieve status
//     get_pin_state();
// }

// const set_pin_low = async () =>{
//     high_confirmation = await make_query(esp_local_ip, "/low");
//     console.log("Query over");
//     // The pin should automatically become high, we simply retrieve status
//     get_pin_state();
// }

// get_pin_state()
// set_pin_high()
// set_pin_low()