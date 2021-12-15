import { createContext } from "react";
import { AlertLevel, CircleDistance, MagnitudeRange, TimeInterval } from "../types";

//Context for found features
interface FoundFeaturesContextInterface {
  baseUrlApi: string;
  earthquakeInterval: TimeInterval;
  circleDistance: CircleDistance;
  magnitudeRange: MagnitudeRange;
  alertLevel: AlertLevel;
  setSelectedFeature: React.Dispatch<React.SetStateAction<string>>;
}
export const FoundFeaturesContext = createContext<FoundFeaturesContextInterface>({
  baseUrlApi: "https://earthquake.usgs.gov",
  earthquakeInterval: { since: new Date("2021-11-16"), to: new Date("2021-11-17") },
  circleDistance: { latitude: 0, longitude: 0, distance: 100 },
  magnitudeRange: { minimum: -1, maximum: 10 },
  alertLevel: AlertLevel.Green,
  setSelectedFeature: () => {
    throw new Error("No magnitude range hook available");
  },
});
