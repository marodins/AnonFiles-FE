
class User{
    constructor(token=null){
        this.token = token;
    }

    setToken(token){
        this.token = token;
    }

}

export default new User();