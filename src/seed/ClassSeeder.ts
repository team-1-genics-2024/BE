import database from "../config/database";

const db = database;

async function main() {
  const classes = await db.class.createMany({
    data: [
      {
        name: 'Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript to build your first website.',
        imageUrl: 'https://example.com/images/web-development.jpg',
      },
      {
        name: 'Data Science for Beginners',
        description: 'Understand the fundamentals of data analysis, data visualization, and basic machine learning.',
        imageUrl: 'https://example.com/images/data-science.jpg',
      },
      {
        name: 'DevOps and Cloud Computing',
        description: 'Dive into DevOps tools and practices including CI/CD, Docker, Kubernetes, and AWS cloud.',
        imageUrl: 'https://example.com/images/devops.jpg',
      },
      {
        name: 'Artificial Intelligence Basics',
        description: 'Learn the core concepts of AI, including machine learning, deep learning, and neural networks.',
        imageUrl: 'https://example.com/images/ai.jpg',
      },
      {
        name: 'Cybersecurity Essentials',
        description: 'Explore how to protect your system from cyber attacks, and understand common security practices.',
        imageUrl: 'https://example.com/images/cybersecurity.jpg',
      },
      {
        name: 'Mobile App Development with Flutter',
        description: 'Build cross-platform mobile applications using Google\'s Flutter framework.',
        imageUrl: 'https://example.com/images/flutter.jpg',
      },
      {
        name: 'Blockchain Technology Fundamentals',
        description: 'Understand how blockchain works and explore its use cases in decentralized applications (dApps).',
        imageUrl: 'https://example.com/images/blockchain.jpg',
      },
      {
        name: 'Introduction to Python Programming',
        description: 'Learn Python programming from scratch with hands-on exercises and projects.',
        imageUrl: 'https://example.com/images/python.jpg',
      },
      {
        name: 'UI/UX Design Basics',
        description: 'Discover the principles of User Interface (UI) and User Experience (UX) design to create better digital products.',
        imageUrl: 'https://example.com/images/uiux.jpg',
      }
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