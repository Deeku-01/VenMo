import { db } from "../src"
import bcrypt from "bcrypt"


async function main() {
    const bobpass = await bcrypt.hash("bob", 10);
    const alicepass = await bcrypt.hash("alice", 10);
    
  const alice = await db.user.upsert({
    where: { number: '9999999999' },
    update: {password:alicepass},
    create: {
      number: '9999999999',
      password: alicepass,
      name: 'alice',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await db.user.upsert({
    where: { number: '9999999998' },
    update: {password:bobpass},
    create: {
      number: '9999999998',
      password: bobpass,
      name: 'bob',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })

  const balance =await db.balance.createMany({
    data:[
      { userId:alice.id,
        amount:0,
        locked:0
      },
      { userId:bob.id,
        amount:0,
        locked:0}],
      skipDuplicates:true
  })

  console.log({ alice, bob  ,balance})
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })