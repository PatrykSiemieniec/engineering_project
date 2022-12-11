import { useState, useContext, Fragment, useEffect } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./System.module.css"
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Delivery from "./Orders/Delivery/Delivery";
import OnSpot from "./Orders/OnSpot/OnSpot";
import Takeaway from "./Orders/Takeaway/Takeaway";
import Footer from "./Footer/Footer";
import Cart from "./MenuCart/Cart";
import EditPanel from "./Edit/EditPanel";

const System = () => {
    const [isShown, setIsShown] = useState(false);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const gridCtx = useContext(GridContext);
    const { isEditPanelShown } = gridCtx;

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

            <div>
                <div className={classes.sidebar}>
                    {isShown && <Sidebar onClose={closeSidebar} />}
                </div>
                {isMenuShown && <Cart onHideCart={closeMenu} />}
                <div className={gridExpanded}>
                    <Header onOpen={openSidebar} onOpenMenu={openMenu} />
                    <Delivery />
                    <OnSpot />
                    <Takeaway />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default System;
