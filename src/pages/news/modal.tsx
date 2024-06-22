import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Article {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content: string;
  teams: [];
}

const Modal = () => {
  const navigate = useNavigate();
  const { articleID } = useParams<{ articleID: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };


  const fetchArticle = async (articleID: string | undefined) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };


  useEffect(() => {
    fetchArticle(articleID);
  }, [articleID]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const { title, thumbnail, date, content } = article;

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto  "
          onClose={closeModal}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-screen max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl relative dark:bg-slate-900">
                <div className="flex items-center justify-between mb-4 ">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold text-gray-600 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full bg-white p-3 text-gray-600 hover:text-blue-600"
                  >
                    <XMarkIcon className="h-10 w-10" aria-hidden="true" />
                  </button>
                </div>

                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full rounded-lg dark:text-white"
                />
                <p className="text-gray-600  text-sm font-medium mt-2 dark:text-white">
                  {date.slice(0,10)}
                </p>

                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="mt-2 text-gray-800 text-justify dark:text-white"
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;