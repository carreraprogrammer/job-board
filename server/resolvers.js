import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"

export const resolvers = {
  Query: {
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
    jobs: () => getJobs(),
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
