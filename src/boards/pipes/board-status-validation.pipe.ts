import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";


export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        // 비교시 대소문자 구문을 막기위해 
        // Value 값은 대문자로 변경해준다.
        
        value = value.toUpperCase();

        if(this.StatusOptions.indexOf(value) === -1){
            throw new BadRequestException(`${value} isn't in the status`);
        }

        return value;
    }

}