import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useSportState } from "../../context/sports/context";
import { useTeamsState } from "../../context/teams/context";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { Sport } from "../../context/sports/reducer";
import { Team } from "../../context/teams/reducer";
import { prefs, getPrefs, setPrefs, UserPrefs } from "./preferences";
import { SubmitHandler, useForm } from "react-hook-form";
import { setPreferences } from "../../context/preferences/actions";
import React from "react";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  name: string;
};

const PreferencesComponent = () => {
  const authToken: string|null = localStorage.getItem("authToken");
  const userDataString: string|null = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const initialSelectedSports = userData?.preferences.selectedSports || [];
  const initialSelectedTeams = userData?.preferences.selectedTeams || [];
  const [isOpen, setIsOpen] = useState(false);
  const [error] = useState(null);
  const dispatchPreferences = usePreferencesDispatch();
  const sportsState: any = useSportState();
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(initialSelectedTeams);
  const [selectedSports, setSelectedSports] = useState<string[]>(initialSelectedSports);
  const { sports, isLoading1, isError, errorMessage } = sportsState;

  const teamsState: any = useTeamsState();
  const {
    teams,
    isLoading: isLoading2,
    isError: isError2,
    errorMessage: errorMessage2,
  } = teamsState;
  const [preferences, setPrefernces] = useState<UserPrefs>({
    preferredSport: [],
    preferredTeams: [],
  });

  const { handleSubmit } = useForm<Inputs>();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
              preferences: {
                  selectedSports,
                  selectedTeams,
              }
          }),
      });
      console.log(response)
      if (!response.ok) {
          throw new Error('Failed to update preferences');
      }

      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      localStorage.setItem(
          'userData',
          JSON.stringify({
              ...userData,
              preferences: {
                  selectedSports,
                  selectedTeams,
              },
          })
      );
      closeModal();
      window.location.reload()

  } catch (error) {
      console.error(error);
  }
  };
  const isLoggedIn = !!localStorage.getItem("userData");

  useEffect(() => {
    if (isLoggedIn) {
      getPrefs()
        .then((data: prefs) => {
          if (Object.keys(data.preferences).length !== 0) {
            setPrefernces(data.preferences);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const sportsResponse = await fetch(`${API_ENDPOINT}/sports`);
        const sportsData = await sportsResponse.json();
        setSportsList(sportsData.sports);

        const teamsResponse = await fetch(`${API_ENDPOINT}/teams`);
        const teamsData = await teamsResponse.json();
        setTeamsList(teamsData);

        if (!sportsResponse.ok || !teamsResponse.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPreferences();
  }, [preferences]);

  const handleSportChange = (sportName: string) => {
    setSelectedSports((prevSelected) => {
      if (prevSelected.includes(sportName)) {
        return prevSelected.filter((sport) => sport !== sportName);
      } else {
        return [...prevSelected, sportName];
      }
    });
  };

  const handleTeamChange = (teamName: string) => {
    setSelectedTeams((prevSelected) => {
      if (prevSelected.includes(teamName)) {
        return prevSelected.filter((team) => team !== teamName);
      } else {
        return [...prevSelected, teamName];
      }
    });
  };

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  if (isError2) {
    return <span>{errorMessage2}</span>;
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-white p-1 ml-3 text-gray-400 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div>
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black dark:text-zinc-50">
                    <div className="flex items-center justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-black"
                      >
                        Preferences
                      </Dialog.Title>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-full bg-white p-1 ml-3 text-gray-800 hover:text-blue-600"
                      >
                        <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <span>{error}</span>}
                        <h2 className="border-b border-gray-600 dark:border-white pb-2 font-medium">
                          Favorite Sports
                        </h2>
                        <div>
                          <div className="flex flex-wrap p-3">
                            {sportsList.map((sport) => (
                              <div
                                key={sport.id}
                                className={`block rounded-md p-2 border cursor-pointer m-2 ${
                                  selectedSports.includes(sport.name)
                                    ? "bg-slate-400 dark:bg-blue-500 dark:text-white"
                                    : "bg-gray-300 dark:bg-gray-200 dark:text-black"
                                }`}
                                onClick={() => handleSportChange(sport.name)}
                              >
                                {sport.name}
                              </div>
                            ))}
                          </div>
                        </div>
                        <h2 className="border-b border-gray-600 dark:border-white pb-2 font-medium">
                          Favorite Teams
                        </h2>
                        <div>
                          <div className="flex flex-wrap p-3">
                            {teamsList.map((team) => (
                              <div
                                key={team.id}
                                className={`block rounded-md p-2 border cursor-pointer m-2 ${
                                  selectedTeams.includes(team.name)
                                    ? "bg-slate-400 dark:bg-blue-500 dark:text-white"
                                    : "bg-gray-300 dark:bg-gray-200 dark:text-black"
                                }`}
                                onClick={() => handleTeamChange(team.name)}
                              >
                                {team.name}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 mr-2  ml-3 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PreferencesComponent;
