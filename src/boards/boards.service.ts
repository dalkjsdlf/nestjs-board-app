import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

    
    constructor(
        @InjectRepository(Board)
        private boardRepository : BoardRepository)
    {}

    async getBoardById(id : number) : Promise<Board>{
        
        const board = await this.boardRepository.findOne(id);

        if(!board){
            throw new NotFoundException(`${id}에 해당하는 게시글을 찾을 수가 없습니다.`);
        }

        return board;
    } 

    /*
        getAllBoards() : Boards
    */
    async getAllBoards() : Promise<Board[]> {
        const boards = await this.boardRepository.find();

        console.log(`게시글 조회 건수 : [${boards.length}]`);

        return boards;
    }

    async createBoard(createBoardDto : CreateBoardDto) : Promise<void> {

        const {title, description} = createBoardDto;

        const board : Board= this.boardRepository.create({
            title,
            description,
            status:BoardStatus.PUBLIC
        })

        console.log(`${board.id} ID를 가진 새로운 게시글 생성`);
        console.log(`게시글 타이틀 [${board.title}]`);
        console.log(`게시글 내용  [${board.description}]`);

        await this.boardRepository.save(board);
    }

    async deleteBoard(id : number) : Promise<void>{

        const result = await this.boardRepository.delete(id);

        console.log("result : ",result);

        if(!result.affected){
            throw new NotFoundException(`${id}에 해당하는 게시글이 존재하지 않아 삭제에 실패했습니다.`);
        }
    }

    async updateBoardStatus(id : number , status : BoardStatus): Promise<void>{

        const board = await this.getBoardById(id);

        board.status = status;

        this.boardRepository.save(board);
    }
}
