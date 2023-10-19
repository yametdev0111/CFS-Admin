import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/adminpage";


const theme = createTheme({

});

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="" element={<AdminPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
