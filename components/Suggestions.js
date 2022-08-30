import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      company: faker.company.name(),
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm">
        <h3 className="text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-12 h-12 object-cover rounded-full border p-[2px]"
            src={profile.avatar}
            alt=""
          />
          <div className="flex-1 mx-4">
            <h2 className="truncate text-sm">{profile.username}</h2>
            <h3 className="w-44 text-sm text-gray-400 truncate">
              {profile.company}
            </h3>
          </div>
          <button className="text-blue-500 text-sm">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
