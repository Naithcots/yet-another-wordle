export function getBaseUrl() {
  if (typeof window !== "undefined" && window && window?.location) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  return "";
}
