import NextAuth from "next-auth";
import { googleID, googleSecret } from "@/utils/sceret";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/db";
import User from "@/models/User.model";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleID,
      clientSecret: googleSecret,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            if (credentials.password === user.password) {
              return user;
            } else {
              throw new Error("Wrong credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
