import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { deleteHotel } from "../redux/hotelSlice";
import { showNotification } from "../redux/notificationSlice";
import { resolveImageUrl } from "../utils/imageUrl";
import "./HotelDetailPage.css";

function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotel, priceMode } = useSelector((state) => {
    const h = state.hotels.hotels.find((h) => h.id === parseInt(id));
    return { hotel: h, priceMode: state.hotels.priceMode };
  });

  const displayPrice = hotel ? (priceMode === "day" ? hotel.dayPrice : hotel.nightPrice) : null;
  const priceLabel = priceMode === "day" ? "/ day" : "/ night";

  if (!hotel) {
    return (
      <>
        <Helmet>
          <title>Hotel Not Found - HotelHub</title>
        </Helmet>
        <div className="hotel-detail-not-found">
          <h2>Hotel Not Found</h2>
          <p>The hotel you are looking for does not exist or has been removed.</p>
          <Link to="/" className="btn-add-hotel">
            ← Back to Hotels
          </Link>
        </div>
      </>
    );
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${hotel.title}"?`)) {
      const result = await dispatch(deleteHotel(hotel.id));
      if (deleteHotel.fulfilled.match(result)) {
        dispatch(
          showNotification({ message: "Hotel deleted successfully!", type: "success" })
        );
        navigate("/");
      } else {
        dispatch(
          showNotification({ message: "Failed to delete hotel.", type: "error" })
        );
      }
    }
  };

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.01}%2C${hotel.latitude - 0.01}%2C${hotel.longitude + 0.01}%2C${hotel.latitude + 0.01}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`;

  return (
    <>
      <Helmet>
        <title>{hotel.title} - HotelHub</title>
        <meta
          name="description"
          content={`${hotel.title} - ${hotel.description.substring(0, 150)}...`}
        />
      </Helmet>

      <div className="hotel-detail-page">
        <Link to="/" className="hotel-detail-back">
          ← Back to Hotels
        </Link>

        <div className="hotel-detail-card">
          <div className="hotel-detail-image">
            <img
              src={resolveImageUrl(hotel.image)}
              alt={`${hotel.title} - hotel exterior and surroundings`}
            />
          </div>

          <div className="hotel-detail-body">
            <h1 className="hotel-detail-title">{hotel.title}</h1>
            <div className="hotel-detail-prices">
              <div className="hotel-detail-price">
                ${displayPrice} <span>{priceLabel}</span>
              </div>
            </div>

            <div className="hotel-detail-section">
              <h3>Description</h3>
              <p className="hotel-detail-description">{hotel.description}</p>
            </div>

            <div className="hotel-detail-section">
              <h3>Location</h3>
              <div className="hotel-detail-coords">
                <div className="hotel-detail-coord">
                  <span className="label">Latitude</span>
                  <span className="value">{hotel.latitude}</span>
                </div>
                <div className="hotel-detail-coord">
                  <span className="label">Longitude</span>
                  <span className="value">{hotel.longitude}</span>
                </div>
              </div>
            </div>

            <div className="hotel-detail-section">
              <h3>Map</h3>
              <div className="hotel-detail-map">
                <iframe
                  title={`Map showing location of ${hotel.title}`}
                  src={mapSrc}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="hotel-detail-actions">
              <Link to={`/edit/${hotel.id}`} className="btn-add-hotel">
                Edit Hotel
              </Link>
              <button
                className="btn-modal-delete"
                onClick={handleDelete}
                style={{ borderRadius: "6px", padding: "8px 20px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelDetailPage;
