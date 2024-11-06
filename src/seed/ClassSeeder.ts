import database from "../config/database";

const db = database;

async function main() {
  const classes = await db.class.createMany({
    data: [
      {
        name: 'Matekamtika',
        description: 'Jelajahi keindahan logika dan angka dalam kelas Matematika ini. Dari dasar-dasar aljabar hingga konsep-konsep lanjutan, pelajari cara berpikir kritis dan menyelesaikan masalah secara kreatif. Cocok untuk semua yang ingin memperkuat pemahaman mereka dan meningkatkan keterampilan berpikir analitis mereka.',
        imageUrl: 'https://example.com/images/web-development.jpg',
      },
      {
        name: 'Fisika',
        description: 'Temukan keajaiban alam semesta melalui konsep dan prinsip Fisika yang mendasar. Kelas ini membahas hukum-hukum dasar yang mengatur gerakan dan energi, menjelaskan fenomena sehari-hari, dan memberikan wawasan mendalam tentang bagaimana alam bekerja. Sempurna untuk penggemar sains dan mereka yang ingin memahami dasar-dasar dunia fisik di sekitar kita.',
        imageUrl: 'https://example.com/images/data-science.jpg',
      },
    ]
  });

  console.log(`${classes.count} classes have been created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });