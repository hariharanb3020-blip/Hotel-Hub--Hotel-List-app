import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { updateHotel } from "../redux/hotelSlice";
import { showNotification } from "../redux/notificationSlice";
import HotelForm from "../components/HotelForm";

function EditHotelPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotel = useSelector((state) =>
    state.hotels.hotels.find((h) => h.id === parseInt(id))
  );

  if (!hotel) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#9ca3af" }}>
        <h2 style={{ color: "#6b7280" }}>Hotel Not Found</h2>
        <p>The hotel you are trying to edit does not exist.</p>
      </div>
    );
  }

  const handleSubmit = async (data) => {
    const result = await dispatch(updateHotel({ ...data, id: hotel.id }));
    if (updateHotel.fulfilled.match(result)) {
      dispatch(
        showNotification({ message: "Hotel updated successfully!", type: "success" })
      );
      navigate("/");
    } else {
      dispatch(
        showNotification({
          message: result.payload || "Failed to update hotel.",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit {hotel.title} - HotelHub</title>
        <meta
          name="description"
          content={`Edit details for ${hotel.title} on HotelHub.`}
        />
      </Helmet>
      <HotelForm
        title={`Edit Hotel: ${hotel.title}`}
        initialData={hotel}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditHotelPage;
