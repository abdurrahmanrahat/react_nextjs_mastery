import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const {
        password, ...restUserData
    } = await request.json()

    await dbConnect()

    const hashedPassword = await bcryptjs.hash(password, 5)

    const newUser = {
        ...restUserData, password: hashedPassword
    }

    try {
        await User.create(newUser);

        return new NextResponse("User registered successfully", { status: 201 })
    } catch (error) {
        console.log('err', error)
        return new NextResponse(error.message, { status: 500 })
    }
}