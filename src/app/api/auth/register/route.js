import User from "@/models/User.model";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();
  await connectDB();
  try {
    await User.create(data);
    return new NextResponse("User has been created!", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
