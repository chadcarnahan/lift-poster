import React from "react";
import { fetcherPosts, fetchPosts } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "firebase/database";
import { useState, useEffect } from "react";
import "./feed.css";

const Feed = ({ user, data, load, loading }) => {
  if (!loading) {
    console.log(data);
  }
  if (load) {
    return <h1>loading</h1>;
  } else {
    return (
      <div>
        <h1>News Feed</h1>
        {data.map((item) => {
          return (
            <div className="feed">
              <div className="post">
                <p className="field">{item.name}: </p>
                <p className="field"> Lift Performed: {item.liftName}</p>
                <p className="field"> Weight Lifted: {item.weight}</p>
                <p className="field"> Reps: {item.reps}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Feed;
