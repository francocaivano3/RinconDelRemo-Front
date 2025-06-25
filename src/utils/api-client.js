const baseUrl = import.meta.env.VITE_API_BASE_URL;

console.log(baseUrl);

const apiClient = {
  get: (url) => request(url, { method: "GET" }),
  post: (url, body = {}) =>
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  put: (url, body) =>
    request(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  patch: (url, body) =>
    request(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  delete: (url) =>
    request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

const request = async (url, options) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) {
      const refreshOk = await refresh();
      if (refreshOk) return request(url, options);
    } else {
      throw new Error(`Error making the request: ${response.statusText}`);
    }
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return response.text();
};

const refresh = async () => {
  const response = await fetch(`${baseUrl}/refresh`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok)
    throw new Error(`Error refreshing the token: ${response.statusText}`);
  return true;
};

export default apiClient;
