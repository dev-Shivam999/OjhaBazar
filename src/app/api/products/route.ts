import { authOptions } from "@/app/lib/auth/auth";
import prisma from "@/db/DB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { formData } = await req.json();

        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Login required" });
        }
        //@ts-ignore
        const userId = String(session.user?.id);


        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" });
        }



        if (existingUser.role == "CUSTOMER") {
            await prisma.user.update({
                where: { id: userId },
                data: { role: "ADMIN" },
            });
        }




        const newProduct = await prisma.product.create({
            data: {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                stock: Number(formData.stock),
                imageUrl: formData.imageUrl,
                category: {
                    connectOrCreate: {
                        where: { name: formData.category },
                        create: { name: formData.category }
                    }
                }

            },

        });

        return NextResponse.json({ message: "Product created successfully", product: newProduct });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
