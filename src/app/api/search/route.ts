import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/DB"; 

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ error: "Search query is required" }, { status: 400 });
        }

       
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ],
            },
            select:{
                id:true,
                title:true
            },
            
            take: 10, 
        });

        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
