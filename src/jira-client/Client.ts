import { Configuration } from "./Configuration"
import Got from "got"


export class Client {
  private configuration: Configuration
  private httpClient: typeof Got

  constructor(config: Configuration) {
    this.configuration = config
    this.httpClient = this.makeHttpClient()
  }

  get(path, params = {}) {
    return this.httpClient.get(path, { searchParams: params })
  }

  post(path, data) {
    return this.httpClient.post(path, {json: { ...data, Authorization: this.buildAuthString()}}).json()
  }

  private makeHttpClient() : typeof Got {

    return Got.extend({
      prefixUrl: `${this.configuration.host}/rest/api/3/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.buildAuthString(),
        "accept": "application/json"
      },
      responseType: 'json'
    });
  }

  private buildAuthString() {
    const {email, password} = this.configuration.authentication.basic
    const authString = Buffer.from(`${email}:${password}`).toString('base64')
    return `Basic ${authString}`
  }
}
