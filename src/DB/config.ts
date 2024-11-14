import mongoose from "mongoose";

const db_url = process.env.DB_URL;

export async function connect() {
    try {
        mongoose.connect(db_url!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("mongodb connected successfully !!");
        });

        connection.on('error', (err)=>{
            console.log("mongodb connection error !!", err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong in the server !");
        console.log(error);
    }
}