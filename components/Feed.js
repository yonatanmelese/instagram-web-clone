import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 max-w-[500px]  md:grid-cols-2 lg:max-w-[830px]  lg:grid-cols-3 mx-auto">
      <section className="col-span-2 max-w-[500px]">
        <Stories />
        <Posts />
      </section>
      <section className="hidden lg:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
