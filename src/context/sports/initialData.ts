import { SportState } from "./reducer";

export const initialState: SportState = {
	sports: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
  };