import { clerkMiddleware } from "@clerk/nextjs/server"; // Ensure this path is correct

const middleware = clerkMiddleware();

export default function handler(req, res) {
  console.log("Middleware executed"); // Add this line to log middleware execution
  return middleware(req, res);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}