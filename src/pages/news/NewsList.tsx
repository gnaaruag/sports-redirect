import React, { useState, useEffect } from "react";
import { useArticlesState } from "../../context/articles/context";
import ArticleId from "./NewsItem";
import { Article } from "../../context/articles/types";

// Define types for articles and user data
type Team = {
  id: number;
  name: string;
};

type UserData = {
  id: number;
  name: string;
  email: string;
  preferences: {
    selectedSports: string[];
    selectedTeams: string[];
  };
};

export default function ArticleList() {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("date");
  const [userData, setUserData] = useState<UserData | null>(null);

  const categories = [
    "All",
    "Your News",
    "Basketball",
    "American Football",
    "Rugby",
    "Field Hockey",
    "Table Tennis",
    "Cricket"
  ];

  // Fetch user data from local storage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const filterByPreferences = (article: Article): boolean => {
    if (!userData) return false;
    const { selectedSports, selectedTeams } = userData.preferences;
    const isPreferredSport = selectedSports.includes(article.sport.name);
    const isPreferredTeam = article.teams.some(team => selectedTeams.includes(team.name));
    return isPreferredSport || isPreferredTeam;
  };

  const filteredArticles: Article[] = selectedCategory === "All"
    ? articles
    : selectedCategory === "Your News"
      ? articles.filter((article: Article) => filterByPreferences(article))
      : selectedCategory === "Preferred Teams and Sports"
        ? articles.filter((article: Article) => filterByPreferences(article))
        : articles.filter((article: Article) => article.sport.name.toLowerCase() === selectedCategory.toLowerCase());

  const sortedArticles: Article[] = filteredArticles.sort((a: Article, b: Article) => {
    if (sortOption === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="p-4 articles">
      <div className="flex gap-4 my-4 items-center ">
      <div className=" ">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`p-1 mr-2 rounded-md ${
                category === selectedCategory ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort-articles" className="font-bold">Sort By:</label>
          <select
            id="sort-articles"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600  dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll max-h-[400px]">
        {sortedArticles.length === 0 ? (
          <span className="flex justify-center items-center dark:text-blue-500">No articles available.</span>
        ) : (
          sortedArticles.map((article: Article) => (
            <ArticleId key={article.id} id={article.id} />
          ))
        )}
      </div>
    </div>
  );
}
