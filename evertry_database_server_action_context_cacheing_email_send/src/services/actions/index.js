"use server"

import { createUser } from "@/db/queries";
import { redirect } from "next/navigation";

async function registerUser(formData) {
    console.log("formData", formData)
    const user = Object.fromEntries(formData);
    const createdUser = await createUser(user);

    redirect('/login')
}

export {
    registerUser
};

