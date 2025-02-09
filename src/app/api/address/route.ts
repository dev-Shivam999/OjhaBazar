import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/DB";
import { authOptions } from "@/app/lib/auth/auth";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //@ts-ignore
    const addresses = await prisma.address.findMany({ where: { userId: session.user.id } });
    return NextResponse.json(addresses);
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        const address = await prisma.address.create({
            data: {
                //@ts-ignore
                userId: session.user.id,
                city: data.city,
                country: "India",
                fullName: data.fullName,
                state: data.state,
                phone: data.phone,
                street: data.street,
                zipCode: data.zipCode



            },
        });

        return NextResponse.json(address);
    } catch (error) {
        console.log(error);

    }
}
