import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
const prisma = new PrismaClient();

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  const defaultPassword = await hash('password');

  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.paragraph(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({
    data: await Promise.all(users),
  });

  const posts = Array.from({ length: 400 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    thumbnail: faker.image.urlLoremFlickr(),
    content: faker.lorem.paragraph(),
    authorId: faker.number.int({ min: 1, max: 10 }),
    published: true,
  }));

  await Promise.all(
    posts.map(async (post) => {
      await prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 10 }),
              })),
            },
          },
        },
      });
    }),
  );
}

main()
  .then(() => {
    console.log('Database seeded successfully');
    void prisma.$disconnect();
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    void prisma.$disconnect();
    process.exit(1);
  });
