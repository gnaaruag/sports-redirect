import { API_ENDPOINT } from "../../config/constants";
import { MatchesActions } from './types';

// matches
export const fetchMatches = async (dispatch: React.Dispatch<MatchesActions>) => {
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log( error);
    dispatch({
      type: "FETCH_MATCHES_FAILURE",
      payload: "Unable to load matches",
    });
  }
};
