import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { map } from "lodash";
import { useSelector } from "react-redux";

export function NavBar() {
  const { isAuth } = useSelector((state) => state.auth);

  const location = useLocation();
  const navigate = useNavigate();

  const itemsAdmin = () => {
    if (isAuth) {
      return [
        {
          name: "Inicio",
          href: "/",
          current: location.pathname === "/",
          icon: "home",
        },
        {
          name: "Estadisticas",
          href: "/stats",
          current: location.pathname === "/stats",
          icon: "chart bar",
        },
        {
          name: "Registros",
          href: "/records",
          current: location.pathname === "/records",
          icon: "table",
        },
        {
          name: "Agregar registros",
          href: "/file",
          current: location.pathname === "/file",
          icon: "file",
        },
        {
          name: "Usuarios",
          href: "/users",
          current: location.pathname === "/users",
          icon: "users",
        },
      ];
    } else {
      return [
        {
          name: "Buscar Biblioteca",
          href: "/",
          current: location.pathname === "/",
          icon: "chart bar",
        },
        {
          name: "Solicitar Artículo",
          href: "/request-record",
          current: location.pathname === "/request-record",
          icon: "home",
        },

        {
          name: "Alta de Biblioteca",
          href: "/add-library",
          current: location.pathname === "/add-library",
          icon: "table",
        },
      ];
    }
  };

  return (
    <Menu secondary vertical>
      {map(itemsAdmin(), (item, index) => (
        <Menu.Item
          key={index}
          active={item.current}
          onClick={() => navigate(item.href)}
        >
          <Icon
            name={item.icon}
            className="text-cncs-ligthblue hover:text-cncs-blue"
          />
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
}
