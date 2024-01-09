import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private authService : AuthService){}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<void> {
        console.log("signUp Controller ", authCredentialDto);
        await this.authService.signUp(authCredentialDto);
    }

    @Post('/signIn')
    async signIn(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto) : Promise<string> {
        console.log("signIn Controller ", authCredentialDto);
        return await this.authService.signIn(authCredentialDto);
    }

}
