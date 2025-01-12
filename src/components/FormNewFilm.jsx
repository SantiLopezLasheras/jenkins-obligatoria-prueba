import CrearButton from "./CrearButton";

const FormNewFilm = () => {
  return (
    <form className="bg-form-color text-main-color border border-solid border-main-color rounded-md w-9/12 mr-auto ml-auto p-6">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="nombrePelicula" className="mb-2">
            NAME
          </label>
          <input
            type="text"
            name="nombrePelicula"
            id="nombrePelicula"
            placeholder="Film Name"
            className="border border-solid rounded border-main-color bg-input-color p-2"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="anyoPelicula" className="mb-2">
            YEAR
          </label>
          <input
            type="text"
            name="anyoPelicula"
            id="anyoPelicula"
            placeholder="Year"
            className="border border-solid rounded border-main-color bg-input-color p-2"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="poster" className="mb-2 mt-2">
          FILM POSTER
        </label>
        <input
          type="text"
          name="poster"
          id="poster"
          placeholder="Film Poster"
          className="border border-solid rounded border-main-color bg-input-color p-2"
        />
      </div>

      <CrearButton />
    </form>
  );
};

export default FormNewFilm;
