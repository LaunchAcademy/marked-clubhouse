export type Configuration = {
  host: string,
  projectKey: string,
  authentication: {
    basic: {
      email: string,
      password: string
    }
  }
}
