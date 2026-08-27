import { useEffect, useState } from "react";

type FlipCard = {
  image: string;
  text: string;
};

type FlippingPhotoGridProps = {
  cards: FlipCard[];
};

export function FlippingPhotoGrid({ cards }: FlippingPhotoGridProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (cards.length === 0) return;

    let timer: number;

    const scheduleNextFlip = () => {
      const delay = 4000 + Math.random() * 3000;

      timer = window.setTimeout(() => {
        setFlippedIndex((current) => {
          let nextIndex = Math.floor(Math.random() * cards.length);

          // Make sure the same card doesn't immediately flip again.
          if (cards.length > 1 && nextIndex === current) {
            nextIndex = (nextIndex + 1) % cards.length;
          }

          return nextIndex;
        });

        scheduleNextFlip();
      }, delay);
    };

    // First flip happens fairly soon, but not immediately.
    timer = window.setTimeout(() => {
      const firstIndex = Math.floor(Math.random() * cards.length);
      setFlippedIndex(firstIndex);

      scheduleNextFlip();
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [cards.length]);

  return (
    <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-2 sm:gap-2.5">
      {cards.map((card, index) => {
        const isFlipped = flippedIndex === index;

        return (
          <div
            key={`${card.image}-${index}`}
            className="aspect-square [perspective:1200px]"
          >
            <div
              className={[
                "relative size-full [transform-style:preserve-3d]",
                "transition-transform duration-[1100ms]",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                isFlipped ? "[transform:rotateY(180deg)]" : "",
              ].join(" ")}
            >
              {/* FRONT */}
              <div className="absolute inset-0 overflow-hidden bg-[#f3f2ef] [backface-visibility:hidden]">
                <img
                  src={card.image}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              </div>

              {/* BACK */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#f5f4f1] px-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="font-display text-[10px] tracking-[0.16em] text-[#777] sm:text-xs">
                  {card.text}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}