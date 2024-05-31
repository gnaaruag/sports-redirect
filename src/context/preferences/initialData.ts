import { PreferencesState } from "./reducer";

export const initialPreferencesState: PreferencesState = {
	preferences: {
	  preferredSport: [],
	  preferredTeams: [],
	},
	isLoading: false,
	isError: false,
	errorMessage: "",
  };