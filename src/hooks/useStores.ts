import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";

export function useStores() {
  return useContext(StoreContext);
}
