import { getJobs, getJob } from "./db/jobs.js"
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
      const jobs = await getJobs();
      const companyJobs = jobs.filter((job) => job.companyId === company.id);
      return companyJobs;
    }
  }
};

function toIsoDate (date) {
  return date.slice(0, 'yyyy-mm-dd'.length);
}
