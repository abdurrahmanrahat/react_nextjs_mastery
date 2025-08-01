"use server"

import EmailTemplate from "@/components/payments/EmailTemplate";
import { createUser, findUserByCredentials, updateGoing, updateInterest } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

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
        await sendEmail(eventId, user)
    } catch (error) {
        throw error
    }

    revalidatePath("/")
    redirect("/")
}

async function sendEmail(eventId, user) {
    try {
        console.log(eventId, user, process.env.RESEND_API_KEY);
        const event = await getEventById(eventId);
        const resend = new Resend(process.env.RESEND_API_KEY);
        const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
        const sent = await resend.emails.send({
            from: "noreply@noreply.tapascript.io",
            to: user?.email,
            subject: "Successfully Registered for the event!",
            react: EmailTemplate({ message })
        });
    } catch (error) {
        throw error;
    }

}

export { addGoingEvent, addInterestedEvent, loginUser, registerUser };

