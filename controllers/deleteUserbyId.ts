import { getDb } from "../server";

const deleteUserById = async (req: any, res: any) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const db = getDb();
  const usersCollection = db.collection("users");
  const postsCollection = db.collection("posts");
  const commentsCollection = db.collection("comments");

  try {
    // Find the user
    const user = await usersCollection.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find posts by the user
    const userPosts = await postsCollection.find({ userId }).toArray();
    const postIds = userPosts.map((post) => post.id);

    // Delete user, their posts, and their comments
    await usersCollection.deleteOne({ id: userId });
    await postsCollection.deleteMany({ userId });
    await commentsCollection.deleteMany({ postId: { $in: postIds } });

    res
      .status(200)
      .json({
        message: "User, their posts, and comments deleted successfully.",
      });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteUserById;
