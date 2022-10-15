import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Delivery from "./components/Orders/Delivery";
import OnSpot from "./components/Orders/OnSpot";
import classes from "./App.module.css";
import Takeaway from "./components/Orders/Takeaway";

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={classes.containerV}>
        <Delivery />
        <div className={classes.containerH}>
          <OnSpot />
          <Takeaway/>
        </div>
      </div>
    </div>
  );
}

export default App;
