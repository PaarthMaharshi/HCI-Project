import { createContext, useContext } from "react";

// Shared view state: active tab, open disclosures, project filter, highlight.
export const ViewContext = createContext(null);
export const useView = () => useContext(ViewContext);
