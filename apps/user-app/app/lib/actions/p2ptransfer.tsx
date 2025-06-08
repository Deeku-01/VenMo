"use server"

import { db } from "@repo/db/client";
import { authOptions } from "../auth"
import { getServerSession } from "next-auth";

export async function p2ptransfer(to:string,amount:number){  // to-> phone number of the user 
    const session=await getServerSession(authOptions);
    const fromuser= session?.user?.id;
    if(!fromuser){
        return {
            message:"Send User Not Found"
        }
    }

    const touser=await db.user.findFirst({
        where:{
            number:to
        }
    })

    if(!touser){
        return {
            message:"No such User Registered" // no to_user found
        }
    }

    /*
    tx ? 
        ->Transaction client
        tx is a transaction client - it's essentially a special version of your Prisma client that operates within a database transaction context.
         When you use db.$transaction(async (tx) => {...}), Prisma gives you this tx object.
         tx has the same API as your main db client , but operates under the transaction boundary 

        ✅ GOOD - Atomic, all-or-nothing -> Either both succeed or both fail

        -> So tx is just your regular Prisma client, but with the superpower of ensuring all operations either succeed together or fail together!

    */

    try{
        await db.$transaction(async (tx)=>{ 
            // Locking of rows
    // we need to explicitly lock the balance row for the sending user so that only one transaction can access it at at time, 
    // and the other one waits until the first transaction has committed
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromuser)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(fromuser) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }
          await new Promise(r => setTimeout(r, 4000)); // WHy -> simulate the balance amount for multiple req at same time 
          await tx.balance.update({
            where: { userId: Number(fromuser) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: touser.id },
            data: { amount: { increment: amount } }
          });

          await tx.p2pTransfer.create({
            data:{
                fromUserId:Number(fromuser),
                toUserId:touser.id,
                amount,
                timestamp:new Date()
            }
          })
    })

    // Add in a transactions data

    return {
        message:"Transfer Successfull"
    }

    }catch(e){
        return {
            message:e
        }
    }
}