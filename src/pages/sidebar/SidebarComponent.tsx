import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from "../../config/constants";
import ArticleId from "./NewsItem";

interface Team {
  id: number;
  name: string;
  plays: string;
}

interface Article {
  id: number;
  title: string;
  date: string;
  sport: { name: string };
  teams: { id: number, name: string }[];
}

interface UserPreferences {
  selectedTeams: number[];
  selectedSports: string[];
}

const SidebarComponent: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sports, setSports] = useState<string[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [sortOption, setSortOption] = useState<string>("date");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserPreferences(JSON.parse(userData).preferences);
    }
  }, []);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/teams`)
      .then(response => response.json())
      .then((data: Team[]) => {
        setTeams(data);
        const uniqueSports = [...new Set(data.map(team => team.plays))];
        setSports(uniqueSports);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedSport) {
      setFilteredTeams(teams.filter(team => team.plays === selectedSport));
    } else {
      setFilteredTeams([]);
    }
  }, [selectedSport, teams]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/articles`)
      .then(response => response.json())
      .then((data: Article[]) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setIsError(true);
        setErrorMessage('Error fetching articles');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filterBySelectedTeamAndSport = (article: Article): boolean => {
      const matchesSport = selectedSport ? article.sport.name === selectedSport : true;
      const matchesTeam = selectedTeam !== null ? article.teams.some(team => team.id === selectedTeam) : true;
      return matchesSport && matchesTeam;
    };

    const filtered = articles.filter(filterBySelectedTeamAndSport);

    const sorted = filtered.sort((a: Article, b: Article) => {
      if (sortOption === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredArticles(sorted);
  }, [selectedSport, selectedTeam, articles, sortOption]);

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value ? Number(event.target.value) : null);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const filterSports = userPreferences?.selectedSports.length
    ? sports.filter(sport => userPreferences.selectedSports.includes(sport))
    : sports;

  const filterTeams = userPreferences?.selectedTeams.length
    ? filteredTeams.filter(team => userPreferences.selectedTeams.includes(team.id))
    : filteredTeams;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="flex flex-col sidebar">
      <div className="w-full">
        <div>
          <label htmlFor="sports">Select Sport: </label>
          <select
            id="sports"
            className="p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
            onChange={handleSportChange}
          >
            <option value="">Select Sport</option>
            {filterSports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="teams">Select Team: </label>
          <select
            id="teams"
            className="p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
            onChange={handleTeamChange}
          >
            <option value="">Select Team</option>
            {filterTeams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full py-2">
        <div className="flex flex-col gap-2 overflow-y-scroll w-full max-h-[420px]">
          {filteredArticles.length === 0 ? (
            <span className="flex justify-center items-center dark:text-blue-500">No articles available.</span>
          ) : (
            filteredArticles.map((article: Article) => (
              <ArticleId key={article.id} id={article.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
