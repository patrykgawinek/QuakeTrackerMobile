import { createContext } from "react";

//Context for single feature
interface SingleFeatureContextInterface {
  baseUrlApi: string;
  selectedFeature: string;
}
export const SingleFeatureContext = createContext<SingleFeatureContextInterface>({
  baseUrlApi: "https://earthquake.usgs.gov",
  selectedFeature: "",
});
