import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../utils/imageUrl";
import "./HotelCard.css";

function HotelCard({ hotel, onEdit, onDelete }) {
  const navigate = useNavigate();
  const priceMode = useSelector((state) => state.hotels.priceMode);
  
  const displayPrice = priceMode === "day" ? hotel.dayPrice : hotel.nightPrice;
  const priceLabel = priceMode === "day" ? "/ day" : "/ night";

  const handleCardClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(hotel.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(hotel.id);
  };

  return (
    <div className="hotel-card" onClick={handleCardClick}>
      <div className="hotel-card-image">
        <img
          src={resolveImageUrl(hotel.image)}
          alt={`${hotel.title} - hotel exterior view`}
        />
      </div>
      <div className="hotel-card-body">
        <h3 className="hotel-card-title">{hotel.title}</h3>
        <p className="hotel-card-description">{hotel.description}</p>
        <div className="hotel-card-footer">
          <div className="hotel-card-price">
            ${displayPrice} <span>{priceLabel}</span>
          </div>
          <div className="hotel-card-actions">
            <button className="btn-edit" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
