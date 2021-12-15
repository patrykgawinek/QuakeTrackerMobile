import { createContext } from "react";
import { AlertLevel, CircleDistance, MagnitudeRange, TimeInterval } from "../types";

//Context for search features
interface SearchFeaturesContextInterface {
  earthquakeInterval: TimeInterval;
  setEarthquakeInterval: React.Dispatch<React.SetStateAction<TimeInterval>>;
  circleDistance: CircleDistance;
  setCircleDistance: React.Dispatch<React.SetStateAction<CircleDistance>>;
  magnitudeRange: MagnitudeRange;
  setMagnitudeRange: React.Dispatch<React.SetStateAction<MagnitudeRange>>;
  alertLevel: AlertLevel;
  setAlertLevel: React.Dispatch<React.SetStateAction<AlertLevel>>;
}
export const SearchFeaturesContext = createContext<SearchFeaturesContextInterface>({
  earthquakeInterval: { since: new Date("2021-11-16"), to: new Date("2021-11-17") },
  setEarthquakeInterval: () => {
    throw new Error("No earthquake interval hook available");
  },
  circleDistance: { latitude: 0, longitude: 0, distance: 100 },
  setCircleDistance: () => {
    throw new Error("No circle distance interval hook available");
  },
  magnitudeRange: { minimum: -1, maximum: 10 },
  setMagnitudeRange: () => {
    throw new Error("No magnitude range hook available");
  },
  alertLevel: AlertLevel.Green,
  setAlertLevel: () => {
    throw new Error("No alert level hook available");
  },
});
