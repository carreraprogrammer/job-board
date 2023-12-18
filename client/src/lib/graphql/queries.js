// En el archivo ../lib/graphql/queries.js

import { getAccessToken } from '../auth';
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, gql, concat } from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if(accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
  }

  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export async function deleteJob(id) {
  const mutation = gql`
  mutation DeleteJob ($id: ID!) {
    deleteJob(id: $id) {
      id
      title
    }
  } 
  `
  const variables = { id }
  const { deleteJob } = await client.request(mutation, variables)
  return deleteJob
}

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `

  const { data } = await client.request(mutation, {
    mutation,
    variables: {input: { title, description } },
  })

  return data.job
}

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

  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.company
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
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.job
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
  
  const { data } = await apolloClient.query({ query });
  return data.jobs;
}
