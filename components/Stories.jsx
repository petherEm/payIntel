import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";


const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const USERS = [];
    const createRandomUser = () => {
      return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      };
    };

    Array.from({ length: 20 }).forEach(() => {
      USERS.push(createRandomUser());
    });
    setSuggestions(USERS);
  }, []);

  return (
    <div className="flex space-x-2 p-6 mt-8  rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">

      {session && (
        <Story 
          img={session?.user?.image}
          username={session?.user?.name}
        />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
