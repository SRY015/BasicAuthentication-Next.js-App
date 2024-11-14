import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DB/config";
import User from "@/models/userModel";

connect(); // connecting to the database.

export async function POST(request: NextRequest) {
  try {
    const reqBody: any = request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully !",
      success: true,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
