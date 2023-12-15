// En el archivo ../lib/graphql/queries.js

import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export async function getCompany(id) {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const variables = { id };
  const { company } = await client.request(query, variables);
  return company;
}

export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;
  const variables = { id };
  const { job } = await client.request(query, variables);
  return job;
}

export async function getJobs() {
  const query = gql`
    {
      jobs {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;
  
  const { jobs } = await client.request(query);
  return jobs;
}
