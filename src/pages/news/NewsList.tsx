import React, { useState } from "react";
import { useArticlesState } from "../../context/articles/context";
import ArticleId from "./NewsItem";
import "./list.css";

export default function ArticleList() {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Basketball",
    "American Football",
    "Rugby",
    "Field Hockey",
    "Table Tennis",
    "Cricket"
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.sport.name.toLowerCase() === selectedCategory.toLowerCase());

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div>
      <div className="category-buttons flex gap-4 my-4">
        {categories.map(category => (
          <button 
            key={category} 
            onClick={() => handleCategoryChange(category)}
            className={category === selectedCategory ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400" : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400 dark:bg-slate-800"}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll list">
        {filteredArticles.length === 0 ? (
          <span className="flex justify-center items-center dark:text-blue-500">No articles available.</span>
        ) : (
          filteredArticles.map((article) => (
            <ArticleId key={article.id} id={article.id} />
          ))
        )}
      </div>
    </div>
  );
}
