import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setMinPrice,
  setMaxPrice,
  setPriceMode,
} from "../redux/hotelSlice";
import "./FilterPanel.css";

function FilterPanel({ onApply }) {
  const dispatch = useDispatch();
  const { searchTerm, minPrice, maxPrice, priceMode } = useSelector(
    (state) => state.hotels
  );

  const handleClear = () => {
    dispatch(setSearchTerm(""));
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setPriceMode("night"));
    if (onApply) onApply();
  };

  const handleApply = () => {
    if (onApply) onApply();
  };

  return (
    <div className="filter-panel">
      <h3>Filter Hotels</h3>
      
      <div className="filter-group">
        <label>Price Mode</label>
        <div className="price-mode-slider-wrapper">
          <label className="price-slider-switch">
            <input 
              type="checkbox" 
              checked={priceMode === "day"}
              onChange={() => {
                dispatch(setPriceMode(priceMode === "day" ? "night" : "day"));
                if (onApply) setTimeout(() => onApply(), 0);
              }}
            />
            <span className="price-slider-round"></span>
          </label>
          <span className="price-slider-label">
            {priceMode === "day" ? "Day Prices" : "Night Prices"}
          </span>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="search-input">Search by Title</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search hotels..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      <div className="filter-price-row">
        <div className="filter-group">
          <label htmlFor="min-price">Min Price ($)</label>
          <input
            id="min-price"
            type="number"
            placeholder="$0"
            min="0"
            value={minPrice}
            onChange={(e) => dispatch(setMinPrice(e.target.value))}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="max-price">Max Price ($)</label>
          <input
            id="max-price"
            type="number"
            placeholder="$10,000"
            min="0"
            value={maxPrice}
            onChange={(e) => dispatch(setMaxPrice(e.target.value))}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button className="btn-apply" onClick={handleApply}>
          Apply
        </button>
        <button className="btn-clear" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;
