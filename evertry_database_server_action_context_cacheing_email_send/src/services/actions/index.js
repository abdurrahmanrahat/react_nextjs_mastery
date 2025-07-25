"use server"

import { createUser, findUserByCredentials, updateGoing, updateInterest } from "@/db/queries";
import { revalidatePath } from "next/cache";
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

async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterest(eventId, authId)
    } catch (error) {
        throw error
    }
    revalidatePath("/")
}

async function addGoingEvent(eventId, user) {
    try {
        await updateGoing(eventId, user.id)
    } catch (error) {
        throw error
    }

    revalidatePath("/")
    redirect("/")
}

export { addGoingEvent, addInterestedEvent, loginUser, registerUser };

