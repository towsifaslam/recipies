import mongoose, { trusted } from'mongoose';


const RecipesSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true

  },
  ingredients: [{
    type: String,
    required: true
  }],
  instruction:{
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  userOwner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

export const RecipeModel = mongoose.model('recipes', RecipesSchema)