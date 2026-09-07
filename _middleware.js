export async function onRequest(context) {
    const auth = context.request.headers.get('Authorization');

    if (!auth) {
        return new Response('Authentication required', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        });
    }

    const [scheme, encoded] = auth.split(' ');
    const decoded = atob(encoded);
    const [username, password] = decoded.split(':');

    const VALID_USERNAME = 'admin'; 
    const VALID_PASSWORD = 'ipdcbot'; 

    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
        return new Response('Invalid credentials', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        });
    }

    return await context.next();
}
