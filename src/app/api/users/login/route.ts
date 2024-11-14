import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/DB/config";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // Check if user is exists or not
        const user = await User.findOne({email});
       // console.log(user);
        if(!user){
            return NextResponse.json({"error":"User does not exists"}, {status:400})
        }
        // Check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }

        // Create token data -->
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        // create jsonwebToken --->
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"});

        const response = NextResponse.json({
            message:"Login Successfully !!",
            success:true,
        });

        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}