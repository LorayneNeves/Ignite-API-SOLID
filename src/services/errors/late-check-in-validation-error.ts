export class LateCheckInValidationError extends Error{
    constructor(){
        super('the check can only be validate 20min')
    }
}