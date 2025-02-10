
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/db/DB';
import { authOptions } from '@/app/lib/auth/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
        where: {
            //@ts-ignore
            userId: session.user.id,
            
        },
     
        select:{
            address:true,
            orderItems:{
                include:{
                    product:true
                }
            }
            ,status:true

        }
      
       
    });
    
    

    return NextResponse.json(orders);
}