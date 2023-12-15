// En el archivo ../lib/graphql/queries.js

import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export async function getJobs() {
  const query = gql`
    {
      job {
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
  
  const { job } = await client.request(query);
  return job;
}
