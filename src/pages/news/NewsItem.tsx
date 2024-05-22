import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Article } from "../../context/articles/types";
import React from "react";
import "./news.css";

interface Props {
  id: number;
}

export default function ArticleId(props: Props) {
  const [articlee, setArticle] = useState<Article | null>(null);

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

  if (!articlee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-start items-center gap-2 border-2 border-black p-2 bg-gray-300">
      <div className="flex justify-center items-center p-2 rounded-md ">
        <img
          src={articlee.thumbnail}
          alt={articlee.title}
          className="h-24 w-24 object-cover thumbnail"
        />
      </div>
      <div>
        <p>{articlee.sport.name}</p>
        <h1 className="text-gray-900 font-semibold text-xl">{articlee.title}</h1>
        <p>{articlee.summary}</p>
        <p>{articlee.date.slice(0,10)}</p>
        <a href={`/articles/${articlee.id}`} className="underline hover:text-gray-600">Read more...</a>
      </div>
    </div>
  );
}
