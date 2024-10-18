import React from "react";
import { useSelector } from "react-redux";
import { Image } from "semantic-ui-react";
import { getUserByToken } from "../../utils/jwt";

export function UserInfo() {
  const { access } = useSelector((state) => state.auth);
  const user = getUserByToken(access);
  const date = new Date();
  return (
    <div className="flex gap-2 px-4 pb-4">
      <Image
        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
        avatar
        size="tiny"
      />

      <div className="flex flex-col justify-center items-start">
        <date>{date.toLocaleDateString()}</date>
        <p className="font-bold capitalize">{user.name}</p>
      </div>
    </div>
  );
}
