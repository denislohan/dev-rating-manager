import database from '../database/models';
import sequelize from 'sequelize';
import { computeAverage } from "../helpers/index";

const  Rating   = database.rating;

const AverageRatings   = database.averageRating;
const User = database.user;
class RatingService {
    static async createRating(rating){
        try{
            let ratings = await Rating.create(rating);
            return ratings

        }catch(error){
            console.log("error",rating)
            throw error;
        }
    }

    static async getRatings(param){
        console.log("param", param)
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

    static async computeAverage(trainee){
        try{
            console.log("RatingService 1")
            let allRatings = await RatingService.getRatings({ trainee });
            console.log("RatingService 2")


            //Compute Average of all ratings of a user
            let average_rating = computeAverage(allRatings);

            console.log("average_rating", average_rating)

            //Update the average ratings Table
            await RatingService.updateAverage({trainee},average_rating);
            console.log("Done average_rating")

        }catch(error){
            throw error;
        }
    }

    static async getAverage(param){
        console.log("param ",param)
        try{
            let average = await AverageRatings.findAll({
                where: param,
                include:[
                    {
                        model: User,
                        attributes:['id','firstName','lastName','email']}

                ]
            });

           console.log("average", average)
            return average;

        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async updateAverage(trainee, rating){
        console.log("trainee   ====>", trainee)
        try{
            let found_average = await AverageRatings.findAll({where: trainee});

            if(found_average.length != 0){
                let average = await AverageRatings.update(rating, {
                    returning: true,
                    where: trainee
                });

                return average;
            }

            rating.trainee = trainee.trainee;
            console.log("rating   ====>", rating)


            rating.submitter = 1; //Making Super LF default submitter for now
            let average =  await AverageRatings.create(rating);

            return average;

        }catch(error){
            throw error;
        }
    }
}


export default RatingService;
