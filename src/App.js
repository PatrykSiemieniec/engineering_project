import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Delivery from "./components/Orders/Delivery/Delivery";
import OnSpot from "./components/Orders/OnSpot/OnSpot";
import classes from "./App.module.css";
import Takeaway from "./components/Orders/Takeaway/Takeaway";
import Footer from "./components/Footer/Footer";
import { useState, useContext } from "react";
import { GridContext } from "./store/grid-context";

function App() {
  const [isShown, setIsShown] = useState(false);
  const gridCtx = useContext(GridContext);
  const { isDeliveryClosed, isOnSpotClosed, isTakeawayClosed } = gridCtx;

  const openSidebar = () => {
    setIsShown(true);
  };
  const closeSidebar = () => {
    setIsShown(false);
  };

  const grid = classes.grid;
  const gridExpanded = `${grid} ${!isShown && classes.gridExpanded}`;
  const deliveryClosed = `${classes.deliveryClosed} ${!isDeliveryClosed && classes.deliveryClosedExpanded}`;

  const info = (
    <p className={classes.info}>
      Aby wyświetlić zamówienia udaj się do Menu -{">"} Zamówienia
    </p>
  );
  return (
    <div>
      <div className={classes.sidebar}>
        {isShown && <Sidebar onClose={closeSidebar} />}
      </div>
      <div className={gridExpanded}>
        <Header onOpen={openSidebar} />
        {isDeliveryClosed && isOnSpotClosed && isTakeawayClosed && info}
        <Delivery  />
        <div>
          <OnSpot/>
          <Takeaway/>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
