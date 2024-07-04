import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export function Carousel({ cards }) {
  const ref = useRef(null);

  const slideLeft = () => {
    ref.current.scrollLeft -= 500;
  };

  const slideRight = () => {
    ref.current.scrollLeft += 500;
  };

  return (
    <div className="relative flex justify-center items-center">
      <ChevronLeftIcon
        onClick={slideLeft}
        className="h-8 w-8 opacity-50 hover:opacity-100 cursor-pointer"
      />
      <div
        ref={ref}
        className="h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
      >
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noreferrer"
            className="w-[220px] inline-block p-4 my-4 mx-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-xl shadow-md hover:shadow-2xl"
          >
            <img
              className="w-[600px] h-[125px] rounded mb-2"
              src={
                card.image
                  ? card.image
                  : "https://placehold.co/600x400?text=Imagen+no+disponible"
              }
              alt={card.title}
            />
            <p className="text-md font-bold text-gray-700 line-clamp-2">
              {card.title}
            </p>
            {card.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {card.description}
              </p>
            )}
            {card.year && (
              <p className="text-sm text-gray-600 line-clamp-1">
                Año: {card.year}
              </p>
            )}
            {card.company && (
              <p className="text-sm text-gray-600 line-clamp-1">
                Empresa: {card.company}
              </p>
            )}
          </a>
        ))}
      </div>
      <ChevronRightIcon
        onClick={slideRight}
        className="h-8 w-8 opacity-50 hover:opacity-100 cursor-pointer"
      />
    </div>
  );
}
