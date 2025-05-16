import axios from "axios"; // Import axios for making HTTP requests
import { getDb } from "../server"; // Import database connection
import { User } from "../models/Users"; // Import the User interface
import { Post } from "../models/Posts"; // Import the Post interface

const loadData = async (req: any, res: any) => {
  try {
    // Fetch data from JSON Placeholder
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const db = getDb();
    const usersCollection = db.collection("users");
    const postsCollection = db.collection("posts");
    const commentsCollection = db.collection("comments");

    // Extract raw data
    const users: User[] = usersResponse.data;
    const rawPosts: any[] = postsResponse.data;
    const rawComments: any[] = commentsResponse.data;

    // Insert users
    await usersCollection.insertMany(users);

    // Insert comments
    await commentsCollection.insertMany(rawComments);

    // Map posts to include only comment IDs
    const posts: Post[] = rawPosts.map((post) => {
      const commentIds = rawComments
        .filter((comment) => comment.postId === post.id)
        .map((comment) => comment.id);

      return {
        ...post,
        comments: commentIds, // Store only comment IDs
      };
    });

    // Insert posts with comment IDs
    await postsCollection.insertMany(posts);

    res.status(200).send("Users, posts, and comments loaded successfully.");
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("An error occurred while loading data.");
  }
};

export default loadData;
