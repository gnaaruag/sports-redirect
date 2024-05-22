export interface Score {
	[key: string]: string;
  }
  
  export interface Team {
	id: number;
	name: string;
  }
  
  export interface Match {
	id: number;
	isRunning: boolean;
	name: string;
	location: string;
	startsAt: string;
	endsAt: string;
	sportName: string;
	playingTeam: number;
	story: string;
	score: Score;
	teams: Team[];
  }
  
  export interface MatchesState {
	matches: Match[];
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
  }
  
  export type MatchesActions =
	| { type: 'FETCH_MATCHES_REQUEST' }
	| { type: 'FETCH_MATCHES_SUCCESS'; payload: Match[] }
	| { type: 'FETCH_MATCHES_FAILURE'; payload: string };
  