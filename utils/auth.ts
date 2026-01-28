import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Safely fetch the current authentication session.
 * This function NEVER redirects.
 * 
 * @author Khant Loon Thu
 * @since  2026-01-28
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
 * Requires authentication.
 * Redirects if the user is not authenticated.
 * 
 * @author Khant Loon Thu
 * @since  2026-01-28
 */
export const requireAuth = async (redirectTo = "/sign-in") => {
    const session = await getAuthSession();

    if (!session) {
        redirect(redirectTo);
    }

    return session;
};


/**
 * Optional authentication.
 * Returns session if logged in, otherwise null.
 *  
 * @author Khant Loon Thu
 * @since  2026-01-28
 */
export const optionalAuth = async () => {
    return await getAuthSession();
};

/** 
 * Redirects authenticated users away from guest-only pages
 * (e.g. sign-in, sign-up).
 * 
 * @author Khant Loon Thu
 * @since  2026-01-28
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