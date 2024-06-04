import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Article } from "../../context/articles/types";
import React from "react";
import { SyncLoader } from "react-spinners";

interface Props {
  id: number;
}

export default function ArticleId(props: Props) {
  const [article, setArticle] = useState<Article | null>(null);

  const fetchArticle = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data: Article = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  useEffect(() => {
    fetchArticle(props.id);
  }, [props.id]);

  if (!article) {
    return <div className='flex justify-center items-center'><SyncLoader color="#3b82f6" size={10}/></div>
  }

  return (
    <div className="flex justify-start items-center gap-2 border-2 border-black p-2 bg-gray-300 dark:bg-slate-900">
      <div className="flex justify-center items-center p-2 rounded-md ">
      </div>
      <div>
        <p>{article.sport.name}</p>
        <h1 className="text-gray-900 font-semibold text-xl dark:text-blue-500">{article.title}</h1>
        <p>{article.summary}</p>
        <p>{article.date.slice(0,10)}</p>
        <a href={`/articles/${article.id}`} className="  underline hover:text-gray-600 dark:text-blue-500">Read more...</a>
      </div>
    </div>
  );
}
