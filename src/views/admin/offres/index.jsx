import OffreList from "./components/OffresList";

const Offres = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <OffreList />
      </div>

    </div>
  );
};

export default Offres;
