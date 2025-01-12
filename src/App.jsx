import GridFilms from "./components/GridFilms";
import FormNewFilm from "./components/FormNewFilm";

function App() {
  return (
    <>
      <h1 className="text-3xl text-center font-bold text-main-color mt-10 mb-6">
        Filmography
      </h1>
      <FormNewFilm />
      <GridFilms />
    </>
  );
}

export default App;
