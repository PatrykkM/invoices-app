const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchApi<Resp>(
  method: Method,
  path: string,
  options: {
    body?: unknown;
  } = {},
): Promise<Resp> {
  const { body } = options;

  const headers: Record<string, string> = { Accept: "application/json" };

  if (body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}/${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${msg ? `${msg}` : ""}`);
  }

  const text = await res.text();

  if (!text.trim()) {
    return {} as Resp;
  }

  return JSON.parse(text) as Resp;
}
