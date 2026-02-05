import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "qjda8zjr",
  dataset: 'production',
  apiVersion: '2026-02-02',
  useCdn: false, 
  token: undefined,
})
