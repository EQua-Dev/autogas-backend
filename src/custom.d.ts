declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
      PORT?: string;
    }
  }
}