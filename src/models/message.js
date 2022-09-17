
export class Message{
    constructor(user, user_id, message, time=new Date().toLocaleString()){
        this.user = user;
        this.user_id = user_id;
        this.message = message;
        this.time = time;
    }
}

export const messageFromList = (list)=>{
    return list.map((item, index)=>{
        return messageFromObject(item);
    });
}


export const messageFromObject = (ob)=>{
    console.log(ob);
    return new Message(ob["user"], ob["user_id"], ob["message"], new Date(Math.floor(ob["time"])).toLocaleString());
}