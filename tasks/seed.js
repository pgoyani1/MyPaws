const {
  dbConnection,
  closeConnection,
} = require("./../config/mongoConnection");

const data = require("./../data");

const users = data.users;
const pets = data.pets;
const posts = data.posts;

const fs = require("fs");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  function bindata() {
    fs.readFile("assets/img.jpeg", "base64", async (e, data) => {
      const buffer = new Buffer.from(data, "base64");
      call(buffer);
    });
  }

  bindata();

  async function call(binImg) {
    const user1 = await users.createUser(
      "Yashwanth",
      "Reddy",
      "yash@gmail.com",
      "jack",
      "lab",
      "$2b$10$dg9Yk46F6V7hMrXv8bboG.jSo7cB6L4RlkovGr77Esj.3wdaSasD.",
      binImg
    );

    const user2 = await users.createUser(
      "Yash",
      "Reddy",
      "yashwanth@gmail.com",
      "jack",
      "lab",
      "$2b$10$dg9Yk46F6V7hMrXv8bboG.jSo7cB6L4RlkovGr77Esj.3wdaSasD.",
      binImg
    );

    const uid1 = await user1.data._id.toString();
    const uid2 = await user2.data._id.toString();

    const post1 = await posts.createPost({
      title: "POST 1",
      content: "This is the description for post 1",
      userId: uid1,

      image: binImg,
    });

    const post2 = await posts.createPost({
      title: "POST 2",
      content: "This is the description for post 2",
      userId: uid2,
      image: binImg,
    });

    const post3 = await posts.createPost({
      title: "POST 3",
      content: "This is the description for post 1",
      userId: uid1,
      image: binImg,
    });

    const post4 = await posts.createPost({
      title: "POST 4",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post5 = await posts.createPost({
      title: "POST 5",
      content: "This is the description for post 1",
      userId: uid1,

      image: binImg,
    });

    const post6 = await posts.createPost({
      title: "POST 6",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post7 = await posts.createPost({
      title: "POST 7",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post8 = await posts.createPost({
      title: "POST 8",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post9 = await posts.createPost({
      title: "POST 9",
      content: "This is the description for post 1",
      userId: uid1,

      image: binImg,
    });

    const post10 = await posts.createPost({
      title: "POST 10",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post11 = await posts.createPost({
      title: "POST 11",
      content: "This is the description for post 1",
      userId: uid1,

      image: binImg,
    });

    const post12 = await posts.createPost({
      title: "POST 12",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post13 = await posts.createPost({
      title: "POST 13",
      content: "This is the description for post 1",
      userId: uid1,

      image: binImg,
    });

    const post14 = await posts.createPost({
      title: "POST 14",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post15 = await posts.createPost({
      title: "POST 15",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    const post16 = await posts.createPost({
      title: "POST 16",
      content: "This is the description for post 2",
      userId: uid2,

      image: binImg,
    });

    console.log("Done seeding database");

    await closeConnection();
  }
};

main().catch(console.log);
