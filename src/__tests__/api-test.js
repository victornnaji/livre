import { server, rest } from "test/server";
import { client } from "_helpers/client";
import {QueryClient} from 'react-query';
import * as auth from '_helpers/auth_provider';

// const queryClient = new QueryClient()


jest.mock('react-query');
jest.mock('_helpers/auth_provider');

const apiURL = process.env.REACT_APP_API_URL;

test("make GET request to a given endpoint", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "hello" };

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await client(endpoint);

  expect(result).toEqual(mockResult);
});

test("adds auth header when a token is available", async () => {
  const token = "FAKE_TOKEN";
  let request;

  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "hello" };

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await client(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("allows for config override", async () => {
  let request;

  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "hello" };

  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  const customConfig = {
    method: "PUT",
    headers: { "Content-Type": "fake-type" },
  };

  await client(endpoint, customConfig);

  expect(request.headers.get("Content-Type")).toBe(
    customConfig.headers["Content-Type"]
  );
});

test("when data is provided, it is stringified and the method defaults to POST", async () => {
  const endpoint = "fake-endpoint";
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );

  const data = { a: "b" };
  const result = await client(endpoint, { data });

  expect(result).toEqual(data);
});

test('automatically logs the user out if a request returns a 401', async () => {
    const endpoint = 'test-endpoint'
    const mockResult = {mockValue: 'VALUE'}
    server.use(
      rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
        return res(ctx.status(401), ctx.json(mockResult))
      }),
    )
  
    const error = await client(endpoint).catch(e => e)
  
    expect(error.message).toMatchInlineSnapshot(`"Please re-authenticate."`)
  
    // expect(queryClient.clear).toHaveBeenCalledTimes(1)
    expect(auth.logout).toHaveBeenCalledTimes(1)
  })