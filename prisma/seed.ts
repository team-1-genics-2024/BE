import db from "../src/config/database";
import { userSeeds } from "../src/seeders/userSeed";
const database = db;

const isUser: boolean = true;

async function main() {
  if (isUser) {
    await database.membership.deleteMany({});
    await database.user.deleteMany({});
    await database.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
    await database.$executeRaw`TRUNCATE TABLE "memberships" RESTART IDENTITY CASCADE`;

    for (const user of userSeeds) {
      await database.user.create({
        data: user,
      });
    }
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
