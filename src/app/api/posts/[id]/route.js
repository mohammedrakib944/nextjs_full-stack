import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Post from "@/models/Post.model";

export const GET = async (req, { params }) => {
  const { id } = params;
  // fetch
  try {
    await connectDB();
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    const message = err.message || "DB error";
    return new NextResponse(message, { status: 500 });
  }
};
