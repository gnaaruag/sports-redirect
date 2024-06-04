import { useEffect } from "react";
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/actions";
import React, { Suspense } from "react";
const MatchCardList = React.lazy(() => import("./MatchCardList.tsx"));
import ErrorBoundary from "../../components/ErrorBoundary.tsx";
import { SyncLoader } from "react-spinners";

export default function LiveMatch() {
  const matchDispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(matchDispatch);
  }, [matchDispatch]);

  return (
    <div>
      <h1 className="text-gray-900 font-bold text-xl dark:text-white">
        Live Games
      </h1>
      <div className="mt-2 justify-start flex items-center w-full">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="suspense-loading">
                <SyncLoader color="#3b82f6" size={10} />
              </div>
            }
          >
            <MatchCardList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
