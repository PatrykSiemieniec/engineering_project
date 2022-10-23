import React, { useState, useEffect } from "react";
import classes from "./Menu.module.css";
import MenuItems from "./MenuItems";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/menu.json"
      );

      if (!response.ok) {
        throw new Error("Coś poszło nie tak");
      }
      const responseData = await response.json();

      const loadedMenu = [];
      for (const key in responseData) {
        loadedMenu.push({
          id: key,
          name: responseData[key].name,
          ingredients: responseData[key].ingredients,
          price: responseData[key].price,
        });
      }
      setMenu(loadedMenu);
      setIsLoading(false);
    };

    fetchMenu().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className={classes.loading}><h1>Ładuję menu...</h1></div>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }
  const menuList = menu.map((menu) => (
    <MenuItems
      id={menu.id}
      key={menu.id}
      name={menu.name}
      ingredients={menu.ingredients}
      price={menu.price}
    />
  ));

  return <section>{menuList}</section>;
};

export default Menu;
