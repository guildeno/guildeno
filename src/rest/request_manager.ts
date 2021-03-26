function createRequestBody(body: Record<string, any> | undefined, method: RequestMethods) {
  const headers: { [key: string]: string } = {
    // deno-lint-ignore camelcase
    hmac_signed_session: hmacSignedSession,
    cookie: cookie,
    "User-Agent": USER_AGENT,
  };

  console.log(hmacSignedSession);

  if (method === "GET") body = undefined;

  // if (body?.reason) {
  //   headers["X-Audit-Log-Reason"] = encodeURIComponent(body.reason);
  // }

  if (body && !["GET", "DELETE"].includes(method)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: JSON.stringify(body),
    method: method,
  };
}
