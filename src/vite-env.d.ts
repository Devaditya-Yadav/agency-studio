/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STUDIO_EMAIL?: string;
  readonly VITE_STUDIO_PHONE?: string;
  readonly VITE_STUDIO_SOCIAL_HANDLE?: string;
  readonly VITE_STUDIO_SOCIAL_URL?: string;
  readonly VITE_STUDIO_WEBSITE_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
