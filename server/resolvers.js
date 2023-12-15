import { getJobs } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"

export const resolvers = {
  Query: {
    job: () => getJobs(),
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => {
      return getCompany(job.companyId);
    }
  }
};

function toIsoDate (date) {
  return date.slice(0, 'yyyy-mm-dd'.length);
}
