import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Post from "@/models/Post.model";

export const GET = async (req) => {
  // fetch
  try {
    await connectDB();
    const posts = await Post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    const message = err.message || "DB error";
    return new NextResponse(message, { status: 500 });
  }
};
