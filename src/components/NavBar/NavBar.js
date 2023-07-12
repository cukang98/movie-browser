import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Sidebar, Search } from "..";
import { useDispatch, useSelector } from "react-redux";
import "../global.css";

const NavBar = () => {
  const [mobileOpen, setmobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="toolbar">
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setmobileOpen((prevmobileOpen) => !prevmobileOpen)}
              className="menubutton"
            >
              <Menu />
            </IconButton>
          )}

          <Search />
        </Toolbar>
      </AppBar>
      <div>
        <nav className="drawer">
          {isMobile ? (
            <Drawer
              varient="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setmobileOpen((prevmobileOpen) => !prevmobileOpen)}
              classes={{
                paper: {
                  className: "drawer-paper",
                },
              }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setmobileOpen} />
            </Drawer>
          ) : (
            <Drawer className="drawer-paper" variant="permanent" open>
              <Sidebar setMobileOpen={setmobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
