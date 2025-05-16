import { getDb } from "../server";

const addUser = async (req: any, res: any) => {
  const userData = req.body;

  if (!userData || typeof userData.id !== "number") {
    return res
      .status(400)
      .json({ message: "Invalid user data or missing user ID." });
  }

  const db = getDb();
  const usersCollection = db.collection("users");
  const postsCollection = db.collection("posts");
  const commentsCollection = db.collection("comments");

  try {
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ id: userData.id });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const { posts = [], ...userWithoutPosts } = userData;

    // Insert user
    await usersCollection.insertOne(userWithoutPosts);

    const postDocs: any = [];
    const commentDocs: any = [];

    // Process posts and extract comments
    posts.forEach((post: any) => {
      const { comments = [], ...postWithoutComments } = post;
      postDocs.push({ ...postWithoutComments, userId: userData.id });

      comments.forEach((comment: any) => {
        commentDocs.push({ ...comment, postId: post.id });
      });
    });

    // Insert posts and comments if any
    if (postDocs.length > 0) {
      await postsCollection.insertMany(postDocs);
    }

    if (commentDocs.length > 0) {
      await commentsCollection.insertMany(commentDocs);
    }

    res
      .status(201)
      .json({ message: "User, posts, and comments inserted successfully." });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default addUser;
