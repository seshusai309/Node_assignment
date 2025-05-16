import { getDb } from "../server"; // Import database connection

const getuserById = async (req: any, res: any) => {
  const userId = parseInt(req.params.userId, 10);
  console.log("userId", userId);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const db = getDb();
  const usersCollection = db.collection("users");
  const postsCollection = db.collection("posts");
  const commentsCollection = db.collection("comments");

  try {
    const user = await usersCollection.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find posts for the user
    const posts = await postsCollection.find({ userId }).toArray();

    // Attach full comments for each post
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentDocs = await commentsCollection
          .find({ postId: post.id })
          .toArray();
        return { ...post, comments: commentDocs };
      })
    );

    const userWithPosts = { ...user, posts: postsWithComments };
    res.status(200).json(userWithPosts);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getuserById;
