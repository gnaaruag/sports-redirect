import { API_ENDPOINT } from "../../config/constants";

export const fetchArticles = async (dispatch: any) => {
  // news
  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });


    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log( error);

    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load articles",
    });
  }
};