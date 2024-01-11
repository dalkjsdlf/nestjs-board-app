import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository : UserRepository
    ){
        console.log("jwtStrategy constructor");
        super({
            secretOrKey : "Secret1234",
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        console.log("jwt Validation");
        const {username} = payload;
        const user = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException(`[${username}]은 인가되지 않은 사용자 입니다.`);
        }

        return user;
    }

}