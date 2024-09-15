import CompanySingleCard from "./CompanySingleCard";

const CompanyCard = ({ companies }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((item) => (
        <CompanySingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default CompanyCard;
