import { searchAnime, getSpotlight } from "../utils/api";
import { use } from "react";
import { Navbar } from "../components/navbar";
import Link from "next/link";

const Search = (props) => {
  const query = props.searchParams.query;
  const pageRequest = props.searchParams.page;
  const result = use(searchAnime(query, pageRequest));

  if (result === -1) {
    return <h1>Couldnt find anything</h1>;
  }

  const currentPage = result.currentPage;
  const hasNextPage = result.hasNextPage;

  function getResultData() {
    let list = [];
    for (var i = 0; i < result.results.length; i++) {
      list.push(
        <Link
          href={{
            pathname: '/watch',
            query: {
              malId: result.results[i].malId,
              id: result.results[i].id,
              number: 1
            }
          }}
          key={result.results[i].malId}
          className="w-28 md:w-44 xl:w-36 md:hover:scale-150 md:hover:z-10 transform transition duration-200"
        >
          <div className="h-36 md:h-64 xl:h-52">
            <img
              className="rounded-md w-full h-full object-cover	"
              src={result.results[i].image}
              alt="Info card image"
            />
          </div>
          <h2 className="text-sm leading-tight text-[#73787B] mt-2.5 line-clamp-2">
            {result.results[i].title.userPreferred
              ? result.results[i].title.userPreferred
              : result.results[i].title.english}
          </h2>
        </Link>
      );
    }
    return list;
  }

  function pagination() {
    let prevStyle =
      "rounded-lg border border-teal-500 px-2 py-2 text-gray-700 cursor-pointer";
    let nextStyle = "rounded-lg border border-gray-700 px-2 py-2 text-gray-700";
    let nextHref = "";
    let prevHref = "";

    if (currentPage === 1) {
      prevStyle = "rounded-lg border border-gray-700 px-2 py-2 text-gray-700";
    } else {
      prevHref = {
        pathName: "/search",
        query: {
          query: query,
          page: currentPage - 1,
        },
      };
    }

    if (hasNextPage) {
      nextHref = {
        pathName: "/search",
        query: {
          query: query,
          page: currentPage + 1,
        },
      };
      nextStyle =
        "rounded-lg border border-teal-500 px-2 py-2 text-gray-700 cursor-pointer";
    }

    return (
      <nav
        className="mb-4 flex justify-center space-x-4"
        aria-label="Pagination"
      >
        <Link className={prevStyle} href={prevHref}>
          <span>
            <span className="sr-only">Previous</span>
            <svg
              className="mt-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </Link>

        <span className="rounded-lg border border-teal-500 bg-teal-500 px-4 py-2 text-white">
          {currentPage}
        </span>
        <Link className={nextStyle} href={nextHref}>
          <span className="sr-only">Next</span>
          <svg
            className="mt-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </nav>
    );
  }

  return (
    <div className="bg-[#242428]">
      <Navbar search={query} />
      <div className="bg-[#242428] flex flex-col gap-10 py-12 px-10">
        <h1 className="text-lg">Search result for: {query}</h1>
        <div className="grid gap-y-10 justify-items-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10">
          {getResultData()}
        </div>
        {pagination()}
      </div>
    </div>
  );
};

export default Search;