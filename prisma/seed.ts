import db from "../src/config/database";
import { userSeeds } from "../src/seeders/userSeed";
import bcrypt from "bcrypt";
const database = db;

const isUser: boolean = true;

async function main() {
  if (isUser) {
    await database.membership.deleteMany({});
    await database.user.deleteMany({});
    await database.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
    await database.$executeRaw`TRUNCATE TABLE "memberships" RESTART IDENTITY CASCADE`;

    for (let i = 0; i < userSeeds.length; i++) {
      const salt: number = parseInt(process.env.SALT_ROUNDS || "");
      userSeeds[i].password = await bcrypt.hash(userSeeds[i].password, salt);

      await database.user.create({
        data: userSeeds[i],
      });

      await database.membership.create({
        data: {
          userId: i + 1,
        },
      });
    }

    // for (const user of userSeeds) {
    //   const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    //   user.password = await bcrypt.hash(user.password, salt);

    //   await database.user.create({
    //     data: user,
    //   });
    // }
  }
}

main()
  .then(async () => {
    await database.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await database.$disconnect();
    process.exit(1);
  });
