import { ArticlesState } from "./types";

export const initialState: ArticlesState = {
	articles: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
  };