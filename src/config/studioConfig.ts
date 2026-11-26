/**
 * Studio contact and metadata configuration.
 * Defaults to RFC 2606 / placeholder values for safe public portfolio demos.
 * Override via VITE_STUDIO_* variables in a local .env file (never commit real PII).
 */

function sanitizeHttpsUrl(raw: string | undefined, fallback: string): string {
  const candidate = (raw ?? '').trim();
  if (!candidate) return fallback;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Fall back when invalid URL is supplied
  }
  return fallback;
}

const env = import.meta.env;

export const studioConfig = {
  brandName: 'LIID ESTUDIO',
  email: (env.VITE_STUDIO_EMAIL as string | undefined)?.trim() || 'hello@example.com',
  phoneDisplay: (env.VITE_STUDIO_PHONE as string | undefined)?.trim() || '+34 600 000 000',
  socialHandle: (env.VITE_STUDIO_SOCIAL_HANDLE as string | undefined)?.trim() || '@studio.concept',
  socialUrl: sanitizeHttpsUrl(
    env.VITE_STUDIO_SOCIAL_URL as string | undefined,
    'https://studio.example.com'
  ),
  websiteDisplay: (env.VITE_STUDIO_WEBSITE_LABEL as string | undefined)?.trim() || 'studio.example.com',
  isDemoMode: true,
} as const;
