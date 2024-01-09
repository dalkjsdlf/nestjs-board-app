import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>){
    }
    
    //signup
    async signUp(authCredentialDto : AuthCredentialDto) : Promise<void> {
        console.log("signUp Service ", authCredentialDto);
        console.log("signUp Controller ", authCredentialDto);
        //Dto Destructuring
        const {username, password} = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassowrd = await bcrypt.hash(password, salt);

        //입력할 User객체 생성
        const user : User          = this.userRepository.create({
                                        username,
                                        password : hashedPassowrd
                                     });

        
        
        try{
            //DB에 저장                             
            await this.userRepository.save(user);
        }catch(error){
            console.log(`err code ${error.code}`);
            if(error.code === '23505'){
                throw new ConflictException(`username [${user.username}] already exists`);
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    //signin
    async signIn(authCredentialDto : AuthCredentialDto) : Promise<string>{
        const {username, password} = authCredentialDto;

        const user : User = await this.userRepository.findOne({username} );

        if(user && (await bcrypt.compare(password, user.password))){
            return 'login successfully!';
        }else{
            throw new UnauthorizedException('login failed');
        }

    }
}
