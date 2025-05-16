import { getDb } from "../server";

const deleteAllUsers = async (req: any, res: any) => {
  const db = getDb();
  const usersCollection = db.collection("users");
  const postsCollection = db.collection("posts");
  const commentsCollection = db.collection("comments");

  try {
    // Get all posts to find their IDs
    const allPosts = await postsCollection.find({}).toArray();
    const allPostIds = allPosts.map((post) => post.id);

    // Delete all users, posts, and related comments
    await usersCollection.deleteMany({});
    await postsCollection.deleteMany({});
    await commentsCollection.deleteMany({ postId: { $in: allPostIds } });

    res
      .status(200)
      .json({ message: "All users, posts, and comments have been deleted." });
  } catch (err) {
    console.error("Error deleting all users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteAllUsers;
