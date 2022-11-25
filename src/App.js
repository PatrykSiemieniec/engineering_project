import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Delivery from "./components/Orders/Delivery/Delivery";
import OnSpot from "./components/Orders/OnSpot/OnSpot";
import classes from "./App.module.css";
import Takeaway from "./components/Orders/Takeaway/Takeaway";
import Footer from "./components/Footer/Footer";
import { useState, useContext, Fragment, useEffect } from "react";
import { GridContext } from "./store/grid-context";
import Cart from "./components/MenuCart/Cart";
import EditPanel from "./components/Edit/EditPanel";

function App() {
  const [isShown, setIsShown] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const gridCtx = useContext(GridContext);
  const {
    isDeliveryClosed,
    isOnSpotClosed,
    isTakeawayClosed,
    isEditPanelShown,
  } = gridCtx;

  const openSidebar = () => {
    setIsShown(true);
  };
  const closeSidebar = () => {
    setIsShown(false);
  };
  const openMenu = () => {
    setIsMenuShown(true);
  };
  const closeMenu = () => {
    setIsMenuShown(false);
  };

  const grid = classes.grid;
  const gridExpanded = `${grid} ${!isShown && classes.gridExpanded}`;

  const info = (
    <p className={classes.info}>
      Aby wyświetlić zamówienia udaj się do Menu -{">"} Zamówienia
    </p>
  );

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  return (
    <Fragment>
      {isEditPanelShown && <EditPanel></EditPanel>}
      {!isEditPanelShown && (
        <div>
          <div className={classes.sidebar}>
            {isShown && <Sidebar onClose={closeSidebar} />}
          </div>
          {isMenuShown && <Cart onHideCart={closeMenu} />}
          <div className={gridExpanded}>
            <Header onOpen={openSidebar} onOpenMenu={openMenu} />
            {isDeliveryClosed && isOnSpotClosed && isTakeawayClosed && info}
            <Delivery />
            <OnSpot />
            <Takeaway />
            <Footer />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
