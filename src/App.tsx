import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsList from "./scenes/Products/EventsList";
import EventDetail from "./scenes/Products/EventDetail";
export default function WebApp() {
  return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<EventsList />} />
            <Route path="/p/:eventId" element={<EventDetail />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}