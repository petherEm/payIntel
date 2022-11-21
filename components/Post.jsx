import React, { useEffect, useState } from "react";
import {
  HiBookmark,
  HiChat,
  HiDotsHorizontal,
  HiEmojiHappy,
  HiHeart,
  HiPaperAirplane,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  orderBy,
  query,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();

  const [comment, setComment] = useState([]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="text-white bg-violet-600 my-7 rounded-sm">
      {/* Header  */}
      <div className="flex items-center p-5">
        <img
          src="https://cdn.sanity.io/images/i6rpk6si/production/506a4324696d2986f1b0fae0549601ec58856bb9-2048x2048.jpg"
          alt=""
          className="rounded-full h-14 w-14 object-contain p-1 mr-3"
        />
        <p className="flex-1">{username}</p>
        <HiDotsHorizontal className="h-5" />
      </div>

      {/* Img  */}
      <img src={img} alt="" className="object-cover w-full" />

      {/* Buttons  */}

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex items-center space-x-4">
            <HiHeart className="btn" />
            <HiChat className="btn" />
            <HiPaperAirplane className="btn" />
          </div>
          <HiBookmark className="btn" />
        </div>
      )}

      {/* Caption  */}

      <div>
        <p className="p-5 truncate">
          <span className="font-bold mr-1">{username}</span>
          {caption}
        </p>
      </div>

      {/* Comments  */}
      {comments.length > 0 && (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 p-5">
              <img
                src={comment.data().userImage}
                alt=""
                className="rounded-full h-7 w-7 object-contain p-1 mr-3"
              />
              <p className="flex-1">
                <span className="font-bold mr-1">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* InputBox  */}
      {session && (
        <form className="flex items-center p-4">
          <HiEmojiHappy className="h-8 w-8 mr-3" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 outline-none bg-violet-700 p-4 text-white rounded-lg"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim}
            onClick={sendComment}
            className="font-semibold text-white ml-3"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
