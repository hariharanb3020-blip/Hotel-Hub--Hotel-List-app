import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchHotels, deleteHotel } from "../redux/hotelSlice";
import { showNotification } from "../redux/notificationSlice";
import HotelCard from "../components/HotelCard";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import "./HotelListPage.css";

const ITEMS_PER_PAGE = 6;

function HotelListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels, total, searchTerm, minPrice, maxPrice, priceMode, loading } =
    useSelector((state) => state.hotels);

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  // Keep a ref to always have fresh filter values inside callbacks
  const filtersRef = useRef({ searchTerm, minPrice, maxPrice, priceMode });
  useEffect(() => {
    filtersRef.current = { searchTerm, minPrice, maxPrice, priceMode };
  }, [searchTerm, minPrice, maxPrice, priceMode]);

  const doFetch = (page, filters) => {
    const { search, minPrice: min, maxPrice: max, priceMode: mode } = filters;
    const multiplier = mode === "day" ? (1 / 0.7) : 1;
    
    const backendMinPrice = min !== "" ? Math.round(parseFloat(min) * multiplier) : "";
    const backendMaxPrice = max !== "" ? Math.round(parseFloat(max) * multiplier) : "";

    dispatch(
      fetchHotels({
        search: search ?? "",
        minPrice: backendMinPrice,
        maxPrice: backendMaxPrice,
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      })
    );
  };

  // Initial load
  useEffect(() => {
    doFetch(1, { search: "", minPrice: "", maxPrice: "", priceMode: "night" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    doFetch(page, {
      search: filtersRef.current.searchTerm,
      minPrice: filtersRef.current.minPrice,
      maxPrice: filtersRef.current.maxPrice,
      priceMode: filtersRef.current.priceMode,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Called by FilterPanel's Apply / Clear buttons
  // By the time this callback runs, Redux has already updated the filter state,
  // so we read from filtersRef which is kept in sync via useEffect above.
  const handleFilterApply = () => {
    setCurrentPage(1);
    // Use a small timeout so the useEffect updating filtersRef runs first
    setTimeout(() => {
      doFetch(1, {
        search: filtersRef.current.searchTerm,
        minPrice: filtersRef.current.minPrice,
        maxPrice: filtersRef.current.maxPrice,
        priceMode: filtersRef.current.priceMode,
      });
    }, 0);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    const result = await dispatch(deleteHotel(deleteId));
    setDeleteId(null);

    if (deleteHotel.fulfilled.match(result)) {
      dispatch(
        showNotification({ message: "Hotel deleted successfully!", type: "success" })
      );
      // Re-fetch: go back one page if current page becomes empty
      const remainingTotal = total - 1;
      const newTotalPages = Math.ceil(remainingTotal / ITEMS_PER_PAGE);
      const nextPage =
        currentPage > newTotalPages && newTotalPages > 0
          ? newTotalPages
          : currentPage;
      setCurrentPage(nextPage);
      doFetch(nextPage, {
        search: filtersRef.current.searchTerm,
        minPrice: filtersRef.current.minPrice,
        maxPrice: filtersRef.current.maxPrice,
        priceMode: filtersRef.current.priceMode,
      });
    } else {
      dispatch(
        showNotification({ message: "Failed to delete hotel.", type: "error" })
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const hotelToDelete = deleteId ? hotels.find((h) => h.id === deleteId) : null;

  return (
    <>
      <Helmet>
        <title>Hotel Listings - HotelHub</title>
        <meta
          name="description"
          content="Browse and manage hotel listings. Search by name, filter by price, and explore hotel details."
        />
      </Helmet>

      <div className="hotel-list-page">
        {/* Sidebar Filters */}
        <aside className="hotel-list-sidebar">
          <FilterPanel onApply={handleFilterApply} />
        </aside>

        {/* Main Content */}
        <main className="hotel-list-main">
          <div className="hotel-list-header">
            <span className="hotel-list-count">
              {loading
                ? "Loading..."
                : `${total} hotel${total !== 1 ? "s" : ""} found`}
            </span>
            <Link to="/add" className="btn-add-hotel">
              + Add Hotel
            </Link>
          </div>

          {loading ? (
            <div className="hotel-list-empty">
              <p>Loading hotels...</p>
            </div>
          ) : hotels.length > 0 ? (
            <div className="hotel-list-cards">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <div className="hotel-list-empty">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
              <h3>No hotels found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && hotelToDelete && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Hotel</h3>
            <p>
              Are you sure you want to delete &quot;{hotelToDelete.title}&quot;?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button className="btn-modal-delete" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HotelListPage;
