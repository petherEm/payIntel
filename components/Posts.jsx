import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const posts = [
  {
    id: "123",
    username: "Piotrek Em.",
    userImg:
      "https://cdn.sanity.io/images/i6rpk6si/production/506a4324696d2986f1b0fae0549601ec58856bb9-2048x2048.jpg",
    img: "https://cdn.sanity.io/images/i6rpk6si/production/506a4324696d2986f1b0fae0549601ec58856bb9-2048x2048.jpg",
    caption: "This is a test caption",
  },
];

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
