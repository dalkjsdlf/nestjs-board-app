import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService : BoardsService){}
    
    /**
     * 모든 게시물을 가져온다.
     */
    @Get('/')
    async getAllBoards(@GetUser() user : User) : Promise<Board[]>{

        const boards = await this.boardsService.getAllBoards(user);

        return boards;
    }

    /*
    * 특정 ID로 게시글을 조회한다. 
    */
   @Get('/:id')
   async getBoardById(@Param('id') id : number, @GetUser() user : User ) : Promise<Board>{

    const board = await this.boardsService.getBoardById(id);

    return board
   }

    /**
     * 게시글을 생성한다.
     */
    @Post('/')
    @UsePipes(ValidationPipe)
    async createBoard(@Body() createBoardDto : CreateBoardDto, @GetUser() user : User) : Promise<void>{
        await this.boardsService.createBoard(createBoardDto, user);
    }


    @Patch('/:id/status')
    async updateBoardStatus(@Param('id') id : number,
                            @Body('status', BoardStatusValidationPipe) status : BoardStatus,
                            @GetUser() user : User ) : Promise<void>
    {
        await this.boardsService.updateBoardStatus(id, status);
    }

    @Delete('/:id')
    async deleteBoard(@Param('id') id : number, @GetUser() user : User ) : Promise<void>{
        await this.boardsService.deleteBoard(id, user);
    }

    /**
     * 특정 ID로 게시글을 수정한다.
     */

    /**
     * 특정 ID로 게시글을 삭제한다. 
     */









    // @Get('/')
    // getAllBoards() : Board[]{
    //     console.log('[BoardsController] - getAllBoards 진입');
    //     return this.boardsService.getAllBoards();
    // }
    
    // @Post('/')
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto : CreateBoardDto){
        
    //     console.log('[BoardsController] - createBoard 진입');
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    
    // @Get('/:id')
    // getBoardById(@Param('id') id : string){
    //     console.log(`[BoardsController] - getBoardById 진입 ${id}`);
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id : string){
    //     console.log(`[BoardsController] - deleteBoard 진입 ${id}`);
    //     this.boardsService.deleteBoard(id);
    // }
    
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id : string,
    //     @Body('status', BoardStatusValidationPipe) status : BoardStatus,
    //     ) : Board{
    //     console.log(`[BoardsController] - updateBoardStatus 진입 ${id}`);
    //     return this.boardsService.updateBoardStatus(id, status);
    // }

}
