//Extra

import Link from "next/link";
import Poster from "./poster";
import posters from "./posters";
import Review from "./review";
import reviews from "./reviews";

export default function Extra() {
  return (
    <main className="p-4 sm:p-6 md:p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Posters (workshopy + kurzy) */}
        <div className="space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
        Workshopy a Kurzy
      </h1>
          {posters.map((poster, i) => (
            <Poster key={i} {...poster} />
          ))}
        </div>

        {/* Right: Reviews */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
        Recenze
      </h1>
          {reviews.map((review, i) => (
            <Review key={i} {...review} />
          ))}
        </div>
      </div>
    </main>
  );
}






