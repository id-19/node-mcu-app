import { useState } from 'react'
import './App.css'

const esp_local_ip = "192.168.8.149";
// const esp_local_ip = "172.17.60.187:3000"; // For testing

const make_query = async (ip_address = esp_local_ip, endpoint= "/") => {
  let url = `http://${ip_address}${endpoint}`;
  console.log("the url is :" + url);
  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log("Response data:", data);
    return data;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

function App() {
  const [pin_state, set_pin_state] = useState(0); // 0 is low, 1 is high

  const get_pin_state = async () => {
    let res = await make_query(esp_local_ip, "/status");
    console.log("pin state: ", res);
    set_pin_state((res=="HIGH"? 1: 0));
  }

  const set_pin_high = async () =>{
    let high_confirmation = await make_query(esp_local_ip, "/high");
    console.log("Query over");
    // The pin should automatically become high, we simply retrieve status
    get_pin_state();
    // set_pin_state(1);
  }
  
  const set_pin_low = async () =>{
    let low_confirmation = await make_query(esp_local_ip, "/low");
    console.log("Query over");
    // The pin should automatically become high, we simply retrieve status
    get_pin_state();
    // set_pin_state(0);
  }

  return (
    <>
    <div>
      <h1>Current state is {pin_state ? "HIGH" : "LOW"}</h1> 
      <button onClick={set_pin_high} >Set PIN high</button>
      <button onClick={set_pin_low} >Set PIN low</button>
    </div>
    </>
  )
}

export default App
