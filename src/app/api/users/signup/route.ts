import { connect } from "@/DB/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);
        // Check if user already exists --->
        const user =  await User.findOne({email});
        if(user){
            return NextResponse.json({"error":"User is already exists"},{status:400});
        }
        // hash the password --->
        const salt = await bcryptjs.genSalt(10);
        const hasedPassword = await bcryptjs.hash(password, salt);
        // create a new user ---->
        const newUser = new User({
            username:username,
            email:email,
            password:hasedPassword
        });
        const savedUser = await newUser.save();

        // return the saved user --->
        return NextResponse.json({
            success:true,
            message:"User created successfully !!",
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}