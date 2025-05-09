const mongoose = require('mongoose');
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
main().then(()=>{
    console.log("connection sucessful");

})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/xproject2');

}

const initdb = async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj, owner:"680123b6365d0e705bbaa156"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initdb();
