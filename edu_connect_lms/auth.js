import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import authConfig from "./auth.config";

// async function refreshAccessToken(token) {
//     try {
//         const url = "https://oauth2.googleapis.com/token?" +
//             new URLSearchParams({
//                 client_id: process.env.GOOGLE_CLIENT_ID,
//                 client_secret: process.env.GOOGLE_CLIENT_SECRET,
//                 grant_type: 'refresh_token',
//                 refresh_token: token.refreshToken
//             })

//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             method: 'POST'
//         })

//         const refreshedTokens = await response.json()

//         if (!response.ok) {
//             throw refreshedTokens;
//         }

//         return {
//             ...token,
//             accessToken: refreshedTokens?.access_token,
//             accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
//             refreshToken: refreshedTokens?.refresh_token,
//         }

//     } catch (error) {
//         console.log("err", error)

//         return {
//             ...token,
//             error: "RefreshAccessTokenError"
//         }
//     }
// }

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,

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
                    const user = await User.findOne({ email: credentials?.email });

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Password is not correct");
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
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    // callbacks: {
    //     async jwt({ token, user, account }) {
    //         if (account && user) {
    //             return {
    //                 accessToken: account?.access_token,
    //                 accessTokenExpires: Date.now() + account?.expires_in * 1000,
    //                 refreshToken: account?.refresh_token,
    //                 user
    //             }
    //         }

    //         if (Date.now() < token?.accessTokenExpires) {
    //             return token
    //         }

    //         return refreshAccessToken(token)
    //     },

    //     async session({ session, token }) {
    //         session.user = token?.user;
    //         session.accessToken = token?.access_token;
    //         session.error = token?.error

    //         return session
    //     }
    // }
})
