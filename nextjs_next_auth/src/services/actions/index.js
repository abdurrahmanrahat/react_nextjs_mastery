"use server"

import { signIn, signOut } from "@/../auth";

export async function doSignOut(){
    await signOut()
}

// rename this with: doOAuthSignIn, receive a parameter like google or github or facebook, conditionally switch case if needed.
export async function doSignIn(){
    await signIn("google", {callbackUrl: "http://localhost:3000"})
}

export async function loginUser(formData) {
    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }