import Client from "../Client";
describe("client", () => {
  it("has a factory method that returns a configured instance", () => {
    const client = Client.factory();
    expect(client).toBeDefined();
  });
});
