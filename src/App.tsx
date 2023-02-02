import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsList from "./scenes/Products/EventsList";
export default function WebApp() {
  return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<EventsList />}>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}