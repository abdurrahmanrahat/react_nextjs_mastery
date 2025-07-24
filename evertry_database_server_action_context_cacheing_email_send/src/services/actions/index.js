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
    try {
        const credentials = {};

        credentials.email = formData.get("email")
        credentials.password = formData.get("password")

        const user = await findUserByCredentials(credentials)

        return user
    } catch (error) {
        throw error
    }
}

export {
    loginUser, registerUser
};

