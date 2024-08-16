import PortfolioList from "./components/portfolioList";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <PortfolioList/>
      </div>

    </div>
  );
};

export default Tables;
