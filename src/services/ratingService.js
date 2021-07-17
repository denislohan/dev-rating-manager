import database from '../database/models';
import sequelize from 'sequelize';
import { computeAverage } from "../helpers/index";

const  Rating   = database.Rating;

const AverageRatings   = database.averageRating;
const User = database.user;
class RatingService {
    static async createRating(rating){
        try{
            let ratings = await Rating.create(rating);
            return ratings

        }catch(error){
            throw error;
        }
    }

    static async getRatings(param){
        try{
            let ratings = await Rating.findAll({where: param});
            return ratings;

        }catch(error){
            throw error;
        }
    }

    static async updateRating(id, rating){
        try{
            let updatedRating = await Rating.update(rating, {
                returning: true,
                where: id
            })

            return updatedRating;
        }catch(error){
            throw error;
        }
    }

    static async computeAverage(user){
        try{
            let allRatings = await RatingService.getRatings({ user });

            //Compute Average of all ratings of a user
            let average_rating = computeAverage(allRatings);

            //Update the average ratings Table
            await RatingService.updateAverage({user},average_rating);

        }catch(error){
            throw error;
        }
    }

    static async getAverage(param){
        try{
            let average = await AverageRatings.findAll({
                where: param,
                include:[
                    {
                        model: User,
                        attributes:['id','firstName','lastName','email']}

                ]
            });
            return average;

        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async updateAverage(user, rating){
        try{
            let found_average = await AverageRatings.findAll({where: user});

            if(found_average.length != 0){
                let average = await AverageRatings.update(rating, {
                    returning: true,
                    where: user
                });

                return average;
            }
            rating.user = user.user;
            rating.submitter = 1; //Making Super LF default submitter for now
            let average =  await AverageRatings.create(rating);

            return average;

        }catch(error){
            throw error;
        }
    }
}


export default RatingService;
