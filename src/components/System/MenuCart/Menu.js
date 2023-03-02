import React, { useState, useEffect } from "react";
import classes from "./Menu.module.css";
import MenuItems from "./MenuItems";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const user = localStorage.getItem("uid");

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu.json`
      );

      if (!response.ok) {
        throw new Error("Coś poszło nie tak");
      }
      const responseData = await response.json();
      const loadedMenu = [];
      for (const key in responseData) {
        for (const i in responseData[key]) {
          loadedMenu.push({
            id: responseData[key][i][0].name,
            name: responseData[key][i][0].name,
            ingredients: responseData[key][i][0].ingredients,
            priceS: responseData[key][i][0].priceS,
            priceM: responseData[key][i][0].priceM,
            priceL: responseData[key][i][0].priceL,
          });
        }
      }

      setMenu(loadedMenu);
      setIsLoading(false);
    };

    fetchMenu().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);

    });
  }, []);

  if (menu.length === 0) {
    return (
      <section>
        <p className={classes.empty}>Brak pozycji w menu. Aby dodać nowe pozycje przejdź do Panel {">"} Edytuj Menu</p>
      </section>
    )
  }
  if (isLoading) {
    return (
      <section>
        <div className={classes.loading}>Ładuję menu...</div>
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
      priceS={menu.priceS}
      priceM={menu.priceM}
      priceL={menu.priceL}
    />
  ));


  return <section>{menuList}</section>;
};

export default Menu;
