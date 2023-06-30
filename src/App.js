import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { Outlet } from "react-router-dom";
import NavMenu from "./components/menu";

function App() {
  return (
    <div>
      <NavMenu />
      <Outlet />
    </div>
  );
}

export default App;
