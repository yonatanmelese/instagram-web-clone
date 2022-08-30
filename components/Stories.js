import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

const Stories = () => {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex items-center justify-between overflow-x-scroll space-x-2 p-5 scrollbar-thin scrollbar-thumb-black scroll-thumb-rounded-md border mt-10 mx-2 scrollbar-hide">
      {session && (
        <Story
          profile={{
            username: session?.user?.username,
            avatar: session?.user?.image,
          }}
        />
      )}
      {suggestions.map((profile) => (
        <Story key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default Stories;
