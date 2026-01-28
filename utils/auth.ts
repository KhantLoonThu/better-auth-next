import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Author : Khant Loon Thu
 * Date   : 2026-01-28
 *
 * Safely fetch the current authentication session.
 * This function NEVER redirects.
 */
export const getAuthSession = async () => {
    try {
        return await auth.api.getSession({
            headers: await headers(),
        });
    } catch (error) {
        console.error("Failed to fetch auth session:", error);
        return null;
    }
};

/**
 * Author : Khant Loon Thu
 * Date   : 2026-01-28
 * 
 * Requires authentication.
 * Redirects if the user is not authenticated.
 */
export const requireAuth = async (redirectTo = "/sign-in") => {
    const session = await getAuthSession();

    if (!session) {
        redirect(redirectTo);
    }

    return session;
};


/**
 * Author : Khant Loon Thu
 * Date   : 2026-01-28
 * 
 * Optional authentication.
 * Returns session if logged in, otherwise null.
 */
export const optionalAuth = async () => {
    return await getAuthSession();
};

/**
 * Author : Khant Loon Thu
 * Date   : 2026-01-28
 * 
 * Redirects authenticated users away from guest-only pages
 * (e.g. sign-in, sign-up).
 */
export const redirectIfAuthenticated = async (
    redirectTo = "/"
) => {
    const session = await getAuthSession();

    if (session) {
        redirect(redirectTo);
    }

    return null;
};