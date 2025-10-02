import { Post, Get, Req, Res, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { IsString, IsEmail, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import jwt from 'jsonwebtoken';
import dataSource from '../config/data-source';
import settings from '../config/config';
import { User } from '../models/user.entity';



class RegisterDto {
    @IsString()
    @Type(() => String)
    name: string;

    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;

    @IsEnum(['ACTIVE', 'DISABLED'])
    status: 'ACTIVE' | 'DISABLED' = 'ACTIVE';
}

class LoginDto {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}

class AuthResponseDto {
    @IsString()
    accessToken: string;
}

class ErrorResponseDto {
    @IsString()
    message: string;
}

class VerifyResponseDto {
    @IsBoolean()
    isValid: boolean;
}

class UserResponseDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    status: string;

    @IsString()
    phone: string;

}

@JsonController('/auth')
export default class AuthController {

    @Post('/register')
    @OpenAPI({
        summary: 'Register a new user',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/User'
                    },
                    example: {
                        name: "John Doe",
                        email: "john@example.com",
                        password: "securePassword123",
                        status: "ACTIVE"
                    }
                }
            }
        }
    })
    @ResponseSchema(User)
    async register(@Req() request: any, @Res() response: any) {
        const userRepository = dataSource.getRepository(User)
        const user = userRepository.create(request.body);
        const results = await userRepository.save(user);
        return response.send(results);
    }

    @Post('/login')
    @OpenAPI({
        summary: 'Authenticate user',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {type: 'string', example: 'john@example.com'},
                            password: {type: 'string', example: 'securePassword123'}
                        },
                        required: ['email', 'password']
                    }
                }
            }
        }
    })
    @ResponseSchema(AuthResponseDto, { statusCode: 200 })
    @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
    async auth(@Req() request: any, @Res() response: any) {
        const { body } = request;
        const { email, password } = body;
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return response.status(401).send({ message: "User is not found" });
        }
        const userPassword = user.password;



        const accessToken = jwt.sign({ user: { id: user.id } }, settings.JWT_SECRET_KEY)
        return response.send({ accessToken });
    }

    @Get('/verify')
    @OpenAPI({
        summary: 'Verify user token',
        security: [{ bearerAuth: [] }],
        responses: {
            '200': {
                description: 'Token verification result',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                isValid: { type: 'boolean' }
                            }
                        }
                    }
                }
            }
        }
    })
    @ResponseSchema(VerifyResponseDto)
    async verify(@Req() request: any, @Res() response: any) {
        const { user } = request;
        let isValid = false;
        if (user) {
            isValid = true;
        }
        return response.send({ isValid });
    }

    @Get('/me')
    @OpenAPI({
        summary: 'Get current user info',
        security: [{ bearerAuth: [] }],
        responses: {
            '200': {
                description: 'Current user information',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            }
        }
    })
    @ResponseSchema(User)
    async me(@Req() request: any, @Res() response: any) {
        try {
            console.log('Me endpoint - Headers:', request.headers);

            const { authorization } = request.headers;

            if (!authorization) {
                return response.status(401).send({ message: "Authentication required" });
            }

            const token = authorization.split(' ')[1];
            if (!token) {
                return response.status(401).send({ message: "Token required" });
            }


            const decoded = jwt.verify(token, settings.JWT_SECRET_KEY) as any;
            console.log('Decoded token:', decoded);

            const user = decoded.user;
            if (!user || !user.id) {
                return response.status(401).send({ message: "Invalid token" });
            }

            const userRepository = dataSource.getRepository(User);
            const currentUser = await userRepository.findOneBy({
                id: user.id
            });

            if (!currentUser) {
                return response.status(404).send({ message: "User not found" });
            }

            const { password, ...userWithoutPassword } = currentUser;
            console.log('Returning user:', userWithoutPassword);
            return response.send(userWithoutPassword);

        } catch (error) {
            console.error('Error in me endpoint:', error);
            if (error instanceof jwt.JsonWebTokenError) {
                return response.status(403).send({ message: "Invalid token" });
            }
            return response.status(500)

        }
    }
}