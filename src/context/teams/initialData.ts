import { TeamsState } from "./reducer";

export const initialState: TeamsState = {
	teams: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
  };
  