// Middleware для авторизации
import jwt from 'jsonwebtoken';
import settings from '../config/config';


interface DecodedToken {
    user: any;
}

const authMiddleware = (request: any, response: any, next: any) => {
    const { headers } = request;
    const { authorization } = headers;

    try {
        const [, accessToken] = authorization.split(' ');

        if (!accessToken) {
            return response.status(401).send({ message: "Unauthorized: no token provided" })
        }


        const decoded = jwt.verify(accessToken, settings.JWT_SECRET_KEY) as DecodedToken;
        const { user } = decoded;

        request.user = user;

        next();
    } catch (error) {
        console.error(error);

        return response.status(403).send({ message: "Forbidden: token is invalid or expired" });
    }
}

export default authMiddleware;