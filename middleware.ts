// import { clerkMiddleware } from '@clerk/nextjs/server';
import { authMiddleware } from '@clerk/nextjs/server';
  export default authMiddleware({
    // ignoredRoutes: ['/((?!api|trpc))(_next.*|.+\.[\w]+$)', '/'],
    publicRoutes:["/api/uploadthing","/api/socket/io"]
  })
// export default authMiddleware();
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};