interface Organization {
  name: string;
  address: string;
  logo: string;
  employees: number;
}

const OrganizationCard: React.FC<Organization> = ({
  name,
  address,
  logo,
  employees,
}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={logo}
          alt={name}
          style={{ width: "150px", height: "150px"}}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Address: {address}</p>
        <p>Number of employees: {employees}</p>
      </div>
    </div>
  );
};

export default OrganizationCard;
