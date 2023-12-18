import { GraphQLError } from "graphql"
import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from "./db/jobs.js"
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
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      return createJob({ companyId: user.companyId, title, description });
    },

    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },
    
    updateJob: async (_root, { input: { id, title, description } },  { user }) => {
      const companyId = user.companyId;
      if(!user) {
        throw unauthorizedError('Missing authentication');
      }
      const updatedJob = await updateJob({ id, companyId, title, description });
      if(!updatedJob) {
        throw notFoundError('No Job found with id ' + id);
      }
      return updatedJob;
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
