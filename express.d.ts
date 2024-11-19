// express.d.ts
import { Request } from 'express';
interface UserPayload {
  id: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
    };
  }
}
