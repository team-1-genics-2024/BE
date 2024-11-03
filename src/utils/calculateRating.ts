import { Rating } from "../model/RatingModel";

export const calculateRating = (ratings: Rating[]): number => {
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}