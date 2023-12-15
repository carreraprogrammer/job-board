import { GraphQLError } from "graphql"
import { getJobs, getJob, getJobsByCompany, createJob, deleteJob } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if(!company) {
        throw notFoundError(`Company not found: ${id}`);
      }
      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if(!job) {
        throw notFoundError(`Job not found: ${id}`);
      }
      return job;
    },
    jobs: () => getJobs(),
  },

  Mutation: {
    createJob: async (_root, { input:  { title, description } } ) => {
      const companyId = 'FjcJCHJALA4i'
      return createJob({ companyId, title, description });
    },
    deleteJob: async (_root, { id }) => {
      return await deleteJob(id);
    },

  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => {
      return getCompany(job.companyId);
    }
  },

  Company: {
    jobs: async (company) => {
      return await getJobsByCompany(company.id);
    }
  }
};

function toIsoDate (date) {
  return date.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND'
    }
  });
}
