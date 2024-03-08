import { prisma } from "@/services/database";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt';



export async function POST(req: NextRequest) {
    const {name, email, password} = await req.json()

    if (!name || !email || !password || password.length < 8) {
        return Response.json({ error: "Please provide a name, email, and password." }, {status: 400});
    }

    const user = {
        name,
        email,
        password: bcrypt.hashSync(password, 10)
    }

    try {
        await prisma.user.create({
            data: user
        });

        return Response.json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "An error occurred while creating the user." }, {status: 500});
    }
}
