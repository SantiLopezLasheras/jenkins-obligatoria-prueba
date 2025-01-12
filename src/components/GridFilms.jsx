import { peliculas } from "../films";
import Film from "./Film";

const GridFilms = () => {
  return (
    <div className="my-6 mx-auto flex gap-4 justify-center w-11/12 ">
      {peliculas.map((pelicula) => (
        <Film
          key={pelicula.id}
          name={pelicula.name}
          year={pelicula.year}
          poster={pelicula.image}
        />
      ))}
    </div>
  );
};

export default GridFilms;
