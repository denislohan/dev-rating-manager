import Response from '../helpers/response';

export const ratingAccess = (req,res,next)=>{
    if(req.user.role != 'Manager'){
        return Response.authorizationError(res, 'Only LF\'s can manage ratings');
    }

    next();
}