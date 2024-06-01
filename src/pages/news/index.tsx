import { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context.tsx";
import { fetchArticles } from "../../context/articles/actions.ts";
import ArticleList from "./NewsList.tsx";
import React from "react";

export default function Articles() {
  const articleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  return (
    <div className="">
      <h1 className="text-gray-900 font-bold text-xl dark:text-white">Latest News</h1>
      <div className="mt-2 justify-between flex items-center w-full p-2">
        <ArticleList />
      </div>
    </div>
  );
}