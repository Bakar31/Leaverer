import { Key } from "react";
import OrganizationCard from "./organizationCard";

interface Organization {
  name: string;
  address: string;
  logo: string;
  employees: number;
}

interface OrganizationtListProps {
  orgs: Organization[];
}

const OrganizationList: React.FC<OrganizationtListProps> = ({ orgs }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {orgs.map(
        (
          org: { name: string; address: string; logo: string; employees: number;},
          index: Key | null | undefined
        ) => (
          <OrganizationCard
            key={index}
            name={org.name}
            address={org.address}
            logo={org.logo}
            employees={org.employees}
          />
        )
      )}
    </div>
  );
};

export default OrganizationList;
