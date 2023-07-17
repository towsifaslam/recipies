import express from'express'
import mongoose from 'mongoose';
import { RecipeModel } from "../model/Recipes";
import { userModel } from '../model/User';



const router = express.Router();

router.get('/',async(req,res)=>{
  try {
    const response = await RecipeModel.find({})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})
router.post('/',async(req,res)=>{
  const recipe = new RecipeModel(req.body);
  try {
      const response = await recipe.save();
      res.json(response)
  } catch (error) {
    res.json(error)
  }
})

router.put('/',async(req,res)=>{

  try {
    const recipe = await RecipeModel.findById(req.body.recipeID)
    const user = await userModel.findById(req.body.UserID);
     user.savedRecipes.push(recipe)
     await user.save()
    res.json({
      savedRecipes: user.savedRecipes
    })
 
  } catch (error) {
    res.json(error)
    
  }
})

router.get('/savedRecipes/ids', async(req,res)=>{
  try {
     const user = await userModel.findById(req.body.userID);
     res.json({savedRecipes: user?.savedRecipes})
  } catch (error) {
    res.json(error)
    
  }
})

export { router as recipesRouter}