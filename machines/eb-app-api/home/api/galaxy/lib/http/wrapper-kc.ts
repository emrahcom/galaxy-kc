import { internalServerError } from "./response.ts";

// -----------------------------------------------------------------------------
type functionAdm = (req: Request) => Promise<Response>;

export async function adm(f: functionAdm, req: Request): Promise<Response> {
  try {
    return await f(req);
  } catch {
    return internalServerError();
  }
}
