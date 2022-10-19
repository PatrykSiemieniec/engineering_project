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

  const headerClasses = `${classes.header} ${
    !isShown && classes.headerExpanded
  }`;
  const footerClasses = `${classes.footer} ${
    !isShown && classes.footerExpanded
  }`;
  const gridExpanded = `${classes.grid} ${!isShown && classes.gridExpanded}`;


/*
  let gridStyles = null;
  if (!isDeliveryClosed) {
    gridStyles = `${classes.grid} ${classes.deliveryClosed} ${
      !isShown && classes.gridExpanded
    }`;
    return gridStyles;
  } else if (!isOnSpotClosed) {
    gridStyles = `${classes.grid} ${!isShown && classes.gridExpanded}`;
    return gridStyles;
  } else if (!isTakeawayClosed) {
    gridStyles = `${classes.grid} ${!isShown && classes.gridExpanded}`;
    return gridStyles;
  } else {
    gridStyles = `${classes.grid} ${!isShown && classes.gridExpanded}`;
  }
*/
  return (
    <div>
      <div className={classes.sidebar}>
        {isShown && <Sidebar onClose={closeSidebar} />}
      </div>
      <div className={classes.headerFlex}>
        <div className={headerClasses}>
          <Header onOpen={openSidebar} />
        </div>
      </div>
      <div className={gridExpanded}>
        <div className={classes.delivery}>
          <Delivery />
        </div>
        <div>
          <div className={classes.onSpot}>
            <OnSpot />
          </div>
          <div className={classes.takeaway}>
            <Takeaway />
          </div>
        </div>
      </div>
      <div className={classes.footerFlex}>
        <div className={footerClasses}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
