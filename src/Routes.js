import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Cafe from "./features/cafe/cafe";
import Employee from "./features/employee/employee";

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Navigate to={"cafes"} replace />} />
      <Route path="cafes" element={<Cafe />} />
      <Route path="employees" element={<Employee />} />
    </Route>
  )
);
export default Routes;
