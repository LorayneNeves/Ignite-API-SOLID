export class UserAlredyExistsError extends Error{
    constructor(){
        super('email already exists')
    }
}