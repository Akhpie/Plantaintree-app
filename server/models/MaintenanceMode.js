import mongoose from "mongoose";

const maintenanceModeSchema = mongoose.Schema({
  isEnabled: { type: Boolean, default: false },
});

const MaintenanceMode = mongoose.model(
  "MaintenanceMode",
  maintenanceModeSchema
);
export default MaintenanceMode;
