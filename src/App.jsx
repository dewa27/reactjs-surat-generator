import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentPage from "./pages/DocumentPage";
import { Container } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import PrintIcon from "@mui/icons-material/Print";
import FavoriteIcon from "@mui/icons-material/Favorite";
function App() {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: "#fff", padding: "1rem 1rem 5rem 1rem" }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cetak-surat" element={<DocumentPage />} />
        </Routes>
      </Container>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ position: "fixed", bottom: 0, left: 0, width: "inherit" }}
      >
        <BottomNavigationAction label="Cetak Surat" icon={<PrintIcon />} />
        <BottomNavigationAction label="History" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorit" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </>
  );
}

export default App;
