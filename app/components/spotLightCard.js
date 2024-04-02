import Link from "next/link";

export function SpotlighCard({ props }) {
  const title = props.title.userPreferred
    ? props.title.userPreferred
    : props.title.english;
  return (
    <div className="relative">
      {/* Background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={props.cover}
        alt="Background Image"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 md:w-1/2 text-white py-24 px-10">
        <p className="text-3xl font-bold mb-8">{title}</p>
        <p className="font-bold text-sm mb-8 line-clamp-4">
          {props.description}
        </p>
        <Link
          href={{
            pathname: "/watch",
            query: {
              id: props.id,
              number: 1,
            },
          }}
          className={
            "bg-[#58A557] py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
          }
        >
          Watch
        </Link>
      </div>
    </div>
  );
}
