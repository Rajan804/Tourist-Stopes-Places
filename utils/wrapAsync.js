module.exports = (fn) =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next);
    }
}
// use for error handaling or form validation