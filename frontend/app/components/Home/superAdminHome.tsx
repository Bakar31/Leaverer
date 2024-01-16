"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrganizationList from "../organization/organizationList";

interface Organization {
  name: string;
  address: string;
  logo: string;
  employees: number;
}

const SuperAdminHome = () => {
  const router = useRouter();
  const [orgs, setOrgs] = useState<Organization[]>([]);

  const superAdminClickHandler = () => {
    router.push("/superadmin/createOrganization");
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizations`
      );
      const data = await response.data;

      const organizationsWithEmployeesNumber = data.map((org: any) => ({
        ...org,
        // employees: org.users.length,
      }));
      setOrgs(organizationsWithEmployeesNumber);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={superAdminClickHandler}
      >
        Create Organization
      </button>
      <div>
        <OrganizationList orgs={orgs} />
      </div>
    </div>
  );
};

export default SuperAdminHome;
