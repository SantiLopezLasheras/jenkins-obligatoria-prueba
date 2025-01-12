import EliminarButton from "./EliminarButton";
import UpdateButton from "./UpdateButton";

const Film = ({ name, year, poster }) => {
  return (
    <div className="bg-card-color border border-solid border-main-color rounded relative p-5 flex flex-col items-center gap-y-1">
      <EliminarButton />
      <img
        src={poster}
        alt={name}
        className="border border-solid border-main-color rounded w-72 h-36"
      />
      <h1>{name}</h1>
      <p>{year}</p>
      <UpdateButton />
    </div>
  );
};

export default Film;
