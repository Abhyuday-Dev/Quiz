import { Socket } from "socket.io";

export class UserManager{

    private users:{
        roomId:string;
        socket:Socket;
    }[];
    constructor(){
        this.users = [];
    }

    addUser(roomId:string,socket:Socket){
        this.users.push({roomId:roomId,socket:socket});
        this.createHandlers(roomId,socket);
    }

    private  createHandlers(roomId:string,socket:Socket){
        socket.on('submission',(data)=>{

        });
    }

}