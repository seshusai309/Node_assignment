# 📦 Node.js REST API with MongoDB — Users, Posts & Comments

This project is a RESTful API built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**. It simulates a simple social media backend where:

- Users can be fetched, added, or deleted
- Posts are linked to users
- Comments are linked to posts

All data is initially loaded from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and stored in MongoDB.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Axios

---

## 📁 Project Structure

Final Assignment/
├── controllers/ # Route handlers
│ ├── loadData.ts
│ ├── getUserById.ts
│ ├── deleteUserById.ts
│ ├── deleteAllUsers.ts
│ └── addUser.ts
├── models/ # TypeScript interfaces
│ ├── Users.ts
│ └── Posts.ts
├── server.ts # Express app entry point
├── package.json
├── tsconfig.json
└── README.md


---

## 🚀 API Endpoints

| Method   | Endpoint             | Description                                      |
|----------|----------------------|--------------------------------------------------|
| `GET`    | `/load-data`         | Load users, posts, and comments from JSON API   |
| `GET`    | `/users/:userId`     | Get user by ID with their posts and comments    |
| `POST`   | `/users`             | Add a new user with nested posts and comments   |
| `DELETE` | `/users/:userId`     | Delete a specific user and their content        |
| `DELETE` | `/users`             | Delete all users, posts, and comments           |

---

## 🧪 Example Payload for `POST /users`

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  },
  "posts": [
    {
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit...",
      "comments": [
        {
          "id": 1,
          "name": "id labore ex et quam laborum",
          "email": "Eliseo@gardner.biz",
          "body": "laudantium enim quasi est..."
        }
      ]
    }
  ]
}

