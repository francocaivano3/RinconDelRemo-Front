import Alert from "@mui/material/Alert";
import { useAlert } from "../context/alertContext/AlertContext";

export default function SimpleAlert() {
  const { alert } = useAlert();

  if (!alert.message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        minWidth: "250px",
      }}
    >
      <Alert severity={alert.type} variant="filled">
        {alert.message}
      </Alert>
    </div>
  );
}
