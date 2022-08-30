import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

// const posts = [
//   {
//     id: "1",
//     username: "yonatan",
//     userimage:
//       "https://ichef.bbci.co.uk/news/976/cpsprodpb/10129/production/_120233856_mediaitem120233855.jpg",
//     image:
//       "https://ichef.bbci.co.uk/news/976/cpsprodpb/10129/production/_120233856_mediaitem120233855.jpg",
//     caption:
//       "this is my first post this is my first post this is my first post",
//   },
//   {
//     id: "2",
//     username: "yonas",
//     userimage:
//       "https://ichef.bbci.co.uk/news/976/cpsprodpb/10129/production/_120233856_mediaitem120233855.jpg",
//     image:
//       "https://ichef.bbci.co.uk/news/976/cpsprodpb/10129/production/_120233856_mediaitem120233855.jpg",
//     caption: "this is my first post",
//   },
// ];
const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userimage={post.data().profileImage}
          image={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
