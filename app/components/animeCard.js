import Link from "next/link";

export function AnimeCard({props}) {
  let title = props.title.userPreferred
    ? props.title.userPreferred
    : props.title.english;
  return (
    <Link
      href={{
        pathname: "/watch",
        query: {
          malId: props.malId,
          id: props.id,
          number: 1,
        },
      }}
      className="w-28 md:w-44 xl:w-36 md:hover:scale-150 md:hover:z-10 transform transition duration-200"
    >
      <div className="h-36 md:h-64 xl:h-52">
        <img
          className="rounded-md w-full h-full object-cover	"
          src={props.image}
          alt="Info card image"
        />
      </div>
      <h2 className="text-sm leading-tight text-[#73787B] mt-2.5 truncate ...">
        {title}
      </h2>
    </Link>
  );
}
