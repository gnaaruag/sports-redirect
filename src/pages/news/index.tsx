import { Suspense, useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context.tsx";
import { fetchArticles } from "../../context/articles/actions.ts";
import React from "react";
const ArticleList = React.lazy(() => import("./NewsList.tsx"));
import ErrorBoundary from "../../components/ErrorBoundary.tsx";
import { SyncLoader } from "react-spinners";

export default function Articles() {
  const articleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  return (
    <div className="">
      <h1 className="text-gray-900 font-bold text-xl dark:text-white">
        Latest News
      </h1>
      <div className="mt-2 justify-between flex items-center w-full p-2">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="suspense-loading">
                <SyncLoader color="#3b82f6" size={10} />
              </div>
            }
          >
            <ArticleList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
