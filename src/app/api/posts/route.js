import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Post from "@/models/Post.model";
import PostModel from "@/models/Post.model";

export const GET = async (req) => {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  // fetch
  try {
    await connectDB();
    const posts = await Post.find(username && { username });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    const message = err.message || "DB error";
    return new NextResponse(message, { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  console.log("body: ", body);
  // fetch
  try {
    await connectDB();
    await PostModel.create(body);
    return new NextResponse("Post created!", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message, { status: 500 });
  }
};
