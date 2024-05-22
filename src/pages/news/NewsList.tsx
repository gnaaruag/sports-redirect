import React from "react";
import { useArticlesState } from "../../context/articles/context";
import ArticleId from "./NewsItem";

export default function ArticleList() {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      {articles.map((article: any) => {
        return <ArticleId key={article.id} id={article.id} />;
      })}
    </div>
  );
}
