import { initialState } from "./initialData";

export interface Sport {
	id: number,
	name: string,
}

export interface SportState {
	sports: Sport[],
	isLoading: boolean,
	isError: boolean,
	errorMessage: string,
}

export type SportsActions =
	| { type: "FETCH_SPORTS_REQUEST" }
	| { type: "FETCH_SPORTS_SUCCESS"; payload: Sport[] }
	| { type: "FETCH_SPORTS_FAILURE"; payload: string }

export const reducer = (state: SportState = initialState, action: SportsActions): SportState => {
	switch (action.type) {
		case "FETCH_SPORTS_REQUEST":
			return {
				...state,
				isLoading: true,
			};
		case "FETCH_SPORTS_SUCCESS":
			return {
				...state,
				isLoading: false,
				sports: action.payload,
			};
		case "FETCH_SPORTS_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
}