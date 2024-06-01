import { API_ENDPOINT } from "../../config/constants";


export interface UserPrefs {
	preferredSport: string[];
	preferredTeams: string[];
}

export type prefs = {
	preferences: UserPrefs,
	errors?: string,
}

export const getPrefs = async () => {
	const token: string | null = localStorage.getItem("authToken");

	const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	const prefs: prefs = await response.json();
	return prefs;
};

export const setPrefs = async (prefs: UserPrefs) => {
	const token: string | null = localStorage.getItem("authToken");
	const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ preferences: prefs }),
	});
	const data = await response.json();

	if (!response.ok) {
		if (data.errors.includes("Invalid auth token")) {
			console.log(data.errors)
		} else {
			throw new Error("Failed to set preferances");
		}
	} else {
		getPrefs();
	}
}