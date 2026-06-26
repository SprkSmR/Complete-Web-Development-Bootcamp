export function logger(){
    return function logger_helper(req, res, next){
        console.log(req.url);
        next();
    }
}