"use server"

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";

async function registerUser(formData) {
    console.log("formData", formData)
    const user = Object.fromEntries(formData);
    const createdUser = await createUser(user);

    redirect('/login')
}

async function loginUser(formData) {
    const credentials = {};

    credentials.email = formData.get("email")
    credentials.password = formData.get("password")

    const user = await findUserByCredentials(credentials)

    if(user){
        redirect("/")
    } else {
        throw new Error(`User with email ${formData.get("email")} not found!`)
    }
}

export {
    loginUser, registerUser
};

