import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../redux/notificationSlice";
import "./Notification.css";

function Notification() {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className="notification-overlay">
      <div className={`notification ${type}`}>
        <span className="notification-icon">
          {type === "success" ? "✓" : "✕"}
        </span>
        <span className="notification-message">{message}</span>
        <button
          className="notification-close"
          onClick={() => dispatch(hideNotification())}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Notification;
