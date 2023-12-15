import { get } from "mongoose";
import { getJobs } from "./db/jobs.js"

export const resolvers = {
  Query: {
    job: () => getJobs(),
  },

  Job: {
    date: (job) => toIsoDate(job.date),
  }
};

function toIsoDate (date) {
  return date.toISOString().slice(0, 'yyyy-mm-dd'.length);
}
