export interface Team {
	id: number;
	name: string;
  }
  
  export interface Sport {
	  id: number;
	  name: string;
  }
  
  
  export interface Article{
	  id: number;
	  title: string;
	  thumbnail: string;
	  date: string;
	  summary: string;
	  sport: Sport;
	  teams: Team[];
  }


  
  
  
  export interface ArticlesState {
	  articles: Article[];
	  isLoading: boolean;
	  isError: boolean;
	  errorMessage: string;
  }