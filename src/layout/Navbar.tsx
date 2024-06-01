/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext, Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { fetchTeams } from "../context/teams/actions";
import { fetchSports } from "../context/sports/actions";
import { useSportDispatch } from "../context/sports/context";
import { useTeamsDispatch } from "../context/teams/context";
import LOGO from "../assets/LOGO.png";
import PreferencesComponent from "../pages/preferences/PreferencesComponent";


import "./layout.css";
import { ThemeContext } from "../context/theme";
import React from "react";

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");
  const sportDispatch = useSportDispatch();
  const teamDispatch = useTeamsDispatch();
  const [userNavigation, setUserNavigation] = useState([
    { name: "Sign in", href: "/signin" },
    { name: "Sign up", href: "/signup" },
  ]);

  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    if (authenticated) {
      setUserNavigation([
        { name: "Change Password", href: "/change-password" },
        { name: "Sign out", href: "/logout" },
      ]);
    } else {
      setUserNavigation([
        { name: "Sign in", href: "/signin" },
        { name: "Sign up", href: "/signup" },
      ]);
    }
  }, [authenticated]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setEnabled(savedTheme === "dark");
  }, [setTheme]);

  const toggleTheme = () => {
    const oldTheme = localStorage.getItem("theme");
    const newTheme = oldTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setEnabled(!enabled);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
    window.location.reload()
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(!!localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img src={LOGO} alt="logo" className="img" />
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 gap-2">
                {authenticated && <PreferencesComponent />}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-white text-gray-400 hover:text-blue-600 focus:outline-none"
                  >
                    {enabled ? (
                      <MoonIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <SunIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserIcon className="h-8 w-8" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
