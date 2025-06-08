
import { db } from '@repo/db/client';
import express from 'express'

// only hdfc banks endpoint talks to this server

const app=express();
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    // check if the request actually came out from the hdfc bank, use a webhook secret here
    // TODO: Check if this onRampTxn is processing or not 
    const paymentInformation:{token:string,userId:number,amount:number} = await {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn -> all need to be added inside a transaction
    try{

        const checkinfo = await db.onRampTransaction.findFirst({
            where: {
                token:paymentInformation.token
            }
        })

        if(checkinfo?.status!="Processing" && checkinfo?.amount!=paymentInformation.amount){
            res.status(411).json({
            message:"Payment already made"
        })
        }
        await db.$transaction([
            db.balance.updateMany({
            where:{
                userId:paymentInformation.userId
            },
            data:{
                amount:{
                    increment:paymentInformation.amount
                }
            }
        }),
            db.onRampTransaction.update({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ])
        // need to specify the hdfc bank to say that we have proccesed and not refend the money to user 
        // if u return the status code 411 then the amount gets refunded to the user from hdfc in 2days
        res.status(200).json({
            message:"captured"
        })
    } catch(e){
        console.log(e);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.listen(3003);

