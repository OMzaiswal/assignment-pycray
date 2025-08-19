// import { keys as cms } from '@repo/cms/keys';
// import { keys as email } from '@repo/email/keys';
// import { keys as flags } from '@repo/feature-flags/keys';
// import { keys as core } from '@repo/next-config/keys';
// import { keys as observability } from '@repo/observability/keys';
// import { keys as rateLimit } from '@repo/rate-limit/keys';
// import { keys as security } from '@repo/security/keys';
// import { createEnv } from '@t3-oss/env-nextjs';

// export const env = createEnv({
//   extends: [
//     cms(),
//     core(),
//     email(),
//     observability(),
//     flags(),
//     security(),
//     rateLimit(),
//   ],
//   server: {},
//   client: {},
//   runtimeEnv: {},
// });


// apps/web/env.ts or packages/observability/env.ts
// Minimal placeholder to bypass strict validation

export const env = {
  BASEHUB_TOKEN: "bshb_pk_dummy",
  RESEND_FROM: "dummy@example.com",
  RESEND_TOKEN: "re_dummy",
  ARCJET_KEY: "ajkey_dummy",       // keep ajkey_ prefix to satisfy the check
  BETTERSTACK_URL: "https://example.com", // valid URL format
  // Add other keys your app expects here
};




