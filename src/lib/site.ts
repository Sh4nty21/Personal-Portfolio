/**
 * The site's public address, for metadata, link previews and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL once the final URL is known; on Vercel the
 * production domain is used automatically until then (D11: free vercel.app).
 */
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
