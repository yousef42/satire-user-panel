import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";

const MatxHorizontalNav = ({ navigation, max }) => {
  if (!navigation || !navigation.length) {
    return null;
  }

  if (max && navigation.length > max) {
    let childItem = {
      name: "More",
      icon: "more_vert",
      children: navigation.slice(max, navigation.length),
    };
    navigation = navigation.slice(0, max);
    navigation.push(childItem);
  }

  function renderLevels(levels) {
    return levels.map((item, key) => {
      if (item.children) {
        return (
          <li key={key}>
            <a href="/">
              {item.icon && (
                <Box component="span" className="material-icons item-icon text-middle">{item.icon}</Box>
              )}
              {item.name}
            </a>
            <ul>{renderLevels(item.children)}</ul>
          </li>
        );
      } else {
        return (
          <li key={key}>
            <NavLink to={item.path}>
              {item.icon && (
                <Box component="span" className="material-icons item-icon text-middle">{item.icon}</Box>
              )}
              {item.name}
            </NavLink>
          </li>
        );
      }
    });
  }

  return (
    <div className="horizontal-nav">
      <ul className="menu">{renderLevels(navigation)}</ul>
    </div>
  );
};

export default MatxHorizontalNav;
