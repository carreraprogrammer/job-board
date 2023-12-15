import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../lib/graphql/queries';

function CompanyPage() {
  const [company, setCompany] = useState([]);
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then((data) => setCompany(data));
  }, [companyId]);

  if (!company) return (
    <div className="notification is-primary">
      Loading...
    </div>
  );

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      
    </div>
  );
}

export default CompanyPage;
