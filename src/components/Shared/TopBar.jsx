import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { signOut } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { NavBar, UserInfo } from "./index";

export function TopBar() {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const handleMenu = () => setShowMenu((prevState) => !prevState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(signOut());
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center py-2 px-4 shadow bg-white w-full fixed z-50">
      {showMenu && (
        <div className="absolute top-24 left-4 p-4 border-2 bg-white">
          {isAuth && <UserInfo />}
          <NavBar />
        </div>
      )}
      <div className="block lg:hidden">
        <Button icon={showMenu ? "cancel" : "bars"} onClick={handleMenu} />
      </div>
      <a href="/">
        <img src="/logo.png" alt="CNCS Logo" className="h-14" />
      </a>
      {isAuth ? (
        <Button onClick={onLogout}>Cerrar sesión</Button>
      ) : (
        <Button onClick={() => navigate("/signin")}>Iniciar sesión</Button>
      )}
    </div>
  );
}
