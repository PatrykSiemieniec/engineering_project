import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Delivery from "./components/Orders/Delivery/Delivery";
import OnSpot from "./components/Orders/OnSpot/OnSpot";
import classes from "./App.module.css";
import Takeaway from "./components/Orders/Takeaway/Takeaway";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [isShown, setIsShown] = useState(false);

  const openSidebar = () =>{
    setIsShown(true);
  }
  const closeSidebar = () =>{
    setIsShown(false);
  }

  const deliveryClasses = `${classes.delivery} ${
    !isShown && classes.deliveryExpanded
  }`;
  const remainingClasses = `${classes.remaining} ${
    !isShown && classes.remainingExpanded
  }`;
  const headerClasses = `${classes.header} ${
    !isShown && classes.headerExpanded
  }`;
  const footerClasses = `${classes.footer} ${
    !isShown && classes.footerExpanded
  }`;
  return (
    <div>
      <div className={classes.sidebar}>
        {isShown && <Sidebar onClose={closeSidebar}/>}
      </div>
      <div className={classes.headerFlex}>
        <div className={headerClasses}>
          <Header onOpen={openSidebar}/>
        </div>
      </div>
      <div className={classes.containerV}>
        <div className={deliveryClasses}>
          <Delivery />
        </div>
        <div className={remainingClasses}>
          <OnSpot />
          <Takeaway />
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
