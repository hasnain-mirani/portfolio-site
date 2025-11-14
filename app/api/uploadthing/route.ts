import { createRouteHandler } from "uploadthing/next";
import { uploadRouter } from "./core";

// Force Node runtime (some hosts default to edge; edge lacks fs/env)
export const runtime = "nodejs";

// Handles both GET and POST
export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
