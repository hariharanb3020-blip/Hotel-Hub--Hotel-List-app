import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Notification from "./components/Notification";
import HotelListPage from "./pages/HotelListPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import AddHotelPage from "./pages/AddHotelPage";
import EditHotelPage from "./pages/EditHotelPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Notification />
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/add" element={<AddHotelPage />} />
        <Route path="/edit/:id" element={<EditHotelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
