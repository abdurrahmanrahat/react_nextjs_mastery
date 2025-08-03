import { userModel } from "@/models/user-model"
import { dbConnect } from "@/services/mongo"
import mongoClientPromise from "@/services/mongoClientPromise"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.ENVIRONMENT }),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                await dbConnect();

                // check user in the db
                try {
                    const user = await userModel.findOne({ email: credentials?.email });
                    if (user) {
                        const isMatch = await bcrypt.compare(credentials.password, user.password)

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
})
