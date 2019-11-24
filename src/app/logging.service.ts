export class LoggingService{
    msg:string;

    printLog(message:string){
        console.log(this.msg);
        this.msg = message;
        console.log(message);
    }
}