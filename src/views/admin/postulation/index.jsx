import PostulationList from "./components/PostulationList";

const Postulations = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <PostulationList />
      </div>

    </div>
  );
};

export default Postulations;
