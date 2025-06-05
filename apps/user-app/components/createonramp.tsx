"use server";  // use this for every action .. otherwise the client can directly send req to server

import {db} from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";


export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString(); // axios.get(https://api.hdfc.com/getToken)
    const trans= await db.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });

    return {
        message: "Done"
    }
}
