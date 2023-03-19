import React, { useState, useEffect, useContext } from "react";
import classes from "./Menu.module.css";
import MenuItems from "./MenuItems";
import { GridContext } from "../../../store/grid-context";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const { isNightMode } = useContext(GridContext)

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
        for (const i in responseData[key])
          if (responseData[key][i] !== null) {
            loadedMenu.push({
              id: responseData[key][i].id,
              name: responseData[key][i]?.name,
              ingredients: responseData[key][i]?.ingredients,
              priceS: responseData[key][i]?.priceS,
              priceM: responseData[key][i]?.priceM,
              priceL: responseData[key][i]?.priceL,
            })
          };

      }

      setMenu(loadedMenu);
      setIsLoading(false);
    };

    fetchMenu().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);

    });
  }, []);

  const infoClasses = `${classes.info} ${isNightMode && classes.infoNight}`

  if (menu.length === 0) {
    return (
      <section>
        <p className={infoClasses}>Brak pozycji w menu. Aby dodać nowe pozycje przejdź do Panel {">"} Edytuj Menu</p>
      </section>
    )
  }
  if (isLoading) {
    return (
      <section>
        <div className={infoClasses}>Ładuję menu...</div>
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
