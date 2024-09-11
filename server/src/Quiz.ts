import { IoManager } from "./managers/IoManager";


interface User{
    name: string;
    id:string;
    points:number;

}

interface Problem{
    title:string,
    description:string,
    image:string,
    answer:string,
    option:{
        id:number,
        title:string
    }
}

export class Quiz{

    public roomId: string;
    private hasStarted: boolean;
    private problems:Problem[];
    private activeProblem:number;
    private users:User[]

    constructor(roomId:string){
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems=[];
        this.activeProblem=0;

    }

    addProblem(problem:Problem){
        this.problems.push(problem);
    }

    start(){
        this.hasStarted = true;
        const io=IoManager.getIo();
        io.emit('CHANGE_PROBLEM',{
            problem:this.problems[0]
        })
    }
    next(){
        this.activeProblem++;
        const problem=this.problems[this.activeProblem];
        const io=IoManager.getIo();
        if(problem){
            io.emit('CHANGE_PROBLEM',{
                problem
            })
        }
        else{
            io.emit('QUIZ_END',{
                problem:this.problems[0]
            })
        }
    }

    genRandonString(length: number) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < length; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
     }
    addUser(name: string) {
        const id = this.genRandonString(7);
        this.users.push({
            id,
            name,
            points: 0
        })
        return id;
    }
}