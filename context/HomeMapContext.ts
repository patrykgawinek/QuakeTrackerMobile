import { createContext } from "react";
import { CircleDistance } from "../types";

//Context for home map
interface HomeMapContextInterface {
  baseUrlApi: string;
  circleDistance: CircleDistance;
  setSelectedFeature: React.Dispatch<React.SetStateAction<string>>;
}
export const HomeMapContext = createContext<HomeMapContextInterface>({
  baseUrlApi: "https://earthquake.usgs.gov",
  circleDistance: { latitude: 0, longitude: 0, distance: 100 },
  setSelectedFeature: () => {
    throw new Error("No earthquake interval hook available");
  },
});
