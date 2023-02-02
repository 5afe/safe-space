import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./scenes/Products/ProductsList";
export default function WebApp() {
  return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductsList />}>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}