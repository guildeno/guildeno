// deno-lint-ignore-file no-explicit-any
import { cookie, eventHandlers, hmacSignedSession } from "../bot.ts";
import { RequestMethods } from "../types/lib/rest/request_methods.ts";
import { USER_AGENT } from "../utils/constants.ts";

export const RequestManager = {
  get: (url: string, body?: Record<string, any>) => {
    return runMethod("GET", url, body);
  },
  post: (url: string, body?: Record<string, any>) => {
    return runMethod("POST", url, body);
  },
  patch: (url: string, body?: Record<string, any>) => {
    return runMethod("PATCH", url, body);
  },
  put: (url: string, body?: Record<string, any>) => {
    return runMethod("PUT", url, body);
  },
  delete: (url: string, body?: Record<string, any>) => {
    return runMethod("DELETE", url, body);
  },
};

async function runMethod(method: RequestMethods, url: string, body?: Record<string, any>, retryCount = 0) {
  eventHandlers.debug?.({
    type: "requestCreate",
    data: { method, url, body, retryCount },
  });

  const errorStack = new Error("Location:");
  Error.captureStackTrace(errorStack);

  const query =
    method === "GET" && body
      ? // deno-lint-ignores no-explicit-any
        Object.entries(body as Record<string, any>)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&")
      : "";
  const urlToUse = method === "GET" && query ? `${url}?${query}` : url;

  // No proxy so we need to handle all rate limiting and such
  try {
    console.log("daurl", urlToUse, createRequestBody(body, method));
    const response = await fetch(urlToUse, createRequestBody(body, method));
    console.log("daradu", response);

    if (response.status === 204) return undefined;
    return response.json();
  } catch (error_1) {
    console.error(error_1);
    throw errorStack;
  }
}

// TODO: implement file upload
function createRequestBody(body: Record<string, any> | undefined, method: RequestMethods) {
  const headers: { [key: string]: string } = {
    // deno-lint-ignore camelcase
    hmac_signed_session: hmacSignedSession,
    cookie: cookie,
    "User-Agent": USER_AGENT,
  };

  console.log(hmacSignedSession);

  if (method === "GET") body = undefined;

  if (body && !["GET", "DELETE"].includes(method)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: JSON.stringify(body),
    method: method,
  };
}
