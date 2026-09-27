import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { createHotel } from "../redux/hotelSlice";
import { showNotification } from "../redux/notificationSlice";
import HotelForm from "../components/HotelForm";

function AddHotelPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const result = await dispatch(createHotel(data));
    if (createHotel.fulfilled.match(result)) {
      dispatch(
        showNotification({ message: "Hotel added successfully!", type: "success" })
      );
      navigate("/");
    } else {
      dispatch(
        showNotification({
          message: result.payload || "Failed to add hotel.",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Add New Hotel - HotelHub</title>
        <meta
          name="description"
          content="Add a new hotel listing to HotelHub with details including title, description, price, and location."
        />
      </Helmet>
      <HotelForm title="Add New Hotel" onSubmit={handleSubmit} />
    </>
  );
}

export default AddHotelPage;
