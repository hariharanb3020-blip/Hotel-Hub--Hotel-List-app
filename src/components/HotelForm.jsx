import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../utils/imageUrl";
import "./HotelForm.css";

function HotelForm({ initialData, onSubmit, title }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    latitude: "",
    longitude: "",
  });

  // imageFile holds the actual File object for upload (null if no new file chosen)
  const [imageFile, setImageFile] = useState(null);
  // imagePreview is the URL shown in the preview (blob URL for new files, resolved URL for existing)
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price !== undefined ? initialData.price : "",
        latitude: initialData.latitude || "",
        longitude: initialData.longitude || "",
      });
      // Resolve the existing image URL for preview
      setImagePreview(resolveImageUrl(initialData.image) || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.latitude && formData.latitude !== 0) {
      newErrors.latitude = "Latitude is required";
    } else {
      const lat = parseFloat(formData.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = "Latitude must be between -90 and 90";
      }
    }

    if (!formData.longitude && formData.longitude !== 0) {
      newErrors.longitude = "Longitude is required";
    } else {
      const lng = parseFloat(formData.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = "Longitude must be between -180 and 180";
      }
    }

    if (!formData.price && formData.price !== 0) {
      newErrors.price = "Price is required";
    } else {
      const p = parseFloat(formData.price);
      if (isNaN(p) || p <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        imageFile, // actual File object (null if no new image)
      });
    }
  };

  return (
    <div className="hotel-form-page">
      <h2>{title}</h2>
      <form className="hotel-form" onSubmit={handleSubmit} noValidate>
        {/* Image Upload */}
        <div className="form-group">
          <label>Hotel Image</label>
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Hotel preview" />
              <button
                type="button"
                className="image-preview-remove"
                onClick={removeImage}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="image-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="hotel-image-upload"
              />
              <div className="image-upload-placeholder">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
                <p>Click to upload an image or drag and drop</p>
              </div>
            </div>
          )}
          {errors.image && <p className="form-error">{errors.image}</p>}
        </div>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="hotel-title">Title *</label>
          <input
            id="hotel-title"
            type="text"
            name="title"
            placeholder="Enter hotel title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="hotel-description">Description *</label>
          <textarea
            id="hotel-description"
            name="description"
            placeholder="Enter hotel description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "error" : ""}
            rows={4}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>

        {/* Latitude & Longitude */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="hotel-latitude">Latitude *</label>
            <input
              id="hotel-latitude"
              type="number"
              name="latitude"
              placeholder="e.g. 28.6139"
              step="any"
              value={formData.latitude}
              onChange={handleChange}
              className={errors.latitude ? "error" : ""}
            />
            {errors.latitude && (
              <p className="form-error">{errors.latitude}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="hotel-longitude">Longitude *</label>
            <input
              id="hotel-longitude"
              type="number"
              name="longitude"
              placeholder="e.g. 77.2090"
              step="any"
              value={formData.longitude}
              onChange={handleChange}
              className={errors.longitude ? "error" : ""}
            />
            {errors.longitude && (
              <p className="form-error">{errors.longitude}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="hotel-price">Price per Night ($) *</label>
          <input
            id="hotel-price"
            type="number"
            name="price"
            placeholder="e.g. 250"
            min="0"
            step="any"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "error" : ""}
          />
          {errors.price && (
            <p className="form-error">{errors.price}</p>
          )}
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {initialData ? "Update Hotel" : "Add Hotel"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotelForm;
