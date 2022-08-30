import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Image from "next/image";
import Moment from "react-moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
const Post = ({ id, username, userimage, image, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend.trim(),
      username: session?.user?.username,
      userimage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };
  useEffect(() => {
    const unsubscribe = setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
    return unsubscribe;
  }, [likes]);
  const handleLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  };
  return (
    <div className="bg-white rounded-sm my-5 border mx-2 ">
      <div className="flex items-center px-5 py-3">
        <img
          className="w-10 h-10 rounded-full p-1 border mr-3"
          src={userimage}
          alt={username}
        />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <Image
        className="object-cover"
        src={image}
        alt={caption}
        width={500}
        height={500}
      />
      <div className="flex justify-between px-3 pt-3">
        <div className="flex">
          {hasLiked ? (
            <HeartIconFilled
              onClick={handleLike}
              className="btn text-red-500"
            />
          ) : (
            <HeartIcon onClick={handleLike} className="btn" />
          )}
          {likes.length > 0 && (
            <p className="font-bold text-sm">{likes.length}</p>
          )}
        </div>
        <div className="flex space-x-3 flex-1">
          <ChatIcon className="btn ml-2" />
          <PaperAirplaneIcon className="btn rotate-45" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-3">{username}</span> {caption}
      </p>
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-3">
              <img
                className="w-5 rounded-full"
                src={comment.data().userimage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="mr-2 font-bold">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment className="text-xs pr-5" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleComment}
        className="flex items-center p-4 border-t-2 border-t-gray-100"
      >
        <EmojiHappyIcon className="h-5" />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border-none focus:ring-0 text-sm"
          type="text"
          placeholder="Add a comment..."
        />
        <button
          disabled={!comment.trim()}
          type="submit"
          className="text-blue-500"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
