import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const USERS = [];
    const createRandomUser = () => {
      return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        company: faker.company.name(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      };
    };

    Array.from({ length: 5 }).forEach(() => {
      USERS.push(createRandomUser());
    });
    setSuggestions(USERS);
  }, []);

  return (
    <div className="mt-4 ml-10 text-white">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {
        // Map through the suggestions and render a suggestion for each
        suggestions.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center justify-between mt-3"
          >
            <img
              src={profile.avatar}
              alt=""
              className="w-10 h-10 rounded-full border p-[2px]"
            />

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <h3 className="text-sm text-gray-400">
                Works at {profile.company}
              </h3>
            </div>
            <button className="text-sm font-bold text-rose-600">Follow</button>
          </div>
        ))
      }
    </div>
  );
};

export default Suggestions;
