import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(registerDTO: RegisterDTO): Promise<{
        access_token: string;
    }>;
    GetProfile(req: any): Promise<any>;
}
