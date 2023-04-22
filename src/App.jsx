import React, { useEffect } from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import DocumentPage from "./pages/DocumentPage";
import { Container } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import PrintIcon from "@mui/icons-material/Print";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "react-quill/dist/quill.snow.css";
import { HistoryPage } from "./pages/HistoryPage";
import { styled } from "@mui/material/styles";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.Mui-selected {
    color: blue;
  }
`);

function App() {
  const [active, setActive] = React.useState(false);
  const location = useLocation();
  const [navValue, setNavValue] = React.useState(0);
  useEffect(() => {
    if (location.pathname === "/history") {
      setNavValue(1);
    } else if (location.pathname === "/") {
      setNavValue(0);
    }
  }, [location]);

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: "#fff", padding: "1rem 1rem 5rem 1rem" }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/surat/:id" element={<DocumentPage />} />
        </Routes>
      </Container>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(event, newValue) => {
          setNavValue(newValue);
        }}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "sm",
          marginRight: "auto",
          marginLeft: "auto",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <BottomNavigationAction
          label="Cetak Surat"
          icon={<PrintIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="History"
          icon={<RestoreIcon />}
          component={Link}
          to="/history"
        />
        <BottomNavigationAction label="Favorit" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </>
  );
}

export default App;
