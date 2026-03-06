export function isValidPassword(password: string): boolean {
    const adminPassword = process.env.ADMIN_PASSWORD;
    return password === adminPassword;
}

export function createSessionToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function isValidSessionToken(token: string | undefined): boolean {
    // Simple validation - in production would check against stored sessions
    return token !== undefined && token.length > 20;
}
