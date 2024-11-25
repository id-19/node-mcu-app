import express from "express";
const app = express();
import cors from 'cors';
const IP = "172.17.60.187";
const port = 3000;

// const corsOptions = {
//     origin: ['http://localhost:5173', 'http://172.17.60.187:3000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// };

// app.use(cors(corsOptions));

app.use(cors());

let pin_state = 0;

app.get("/", (req,res) =>{
    res.send("This is just the main page")
})

app.get("/status", (req,res) =>{
    console.log("Status was checked");
    res.status(200).send({...pin_state ? "HIGH" : "LOW"});
})

app.get("/high", (req,res) =>{
    pin_state = 1;
    console.log("pin was set high");
    res.status(200).send("Pin HIGH");
})
app.get("/low", (req,res) =>{
    pin_state = 0;
    console.log("pin was set low");
    res.status(200).send("Pin LOW");
})

app.listen(port, IP, () => {
    console.log(`Server running at http://${IP}:${port}`);
})