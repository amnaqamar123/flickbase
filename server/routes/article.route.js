const express=require('express')
const router=express.Router()
const articleController=require('../Controllers/articleController')
const {addArticleValidator}=require('../middleware/validation')
const auth=require('../middleware/Auth')

router.post('/',auth('createAny','articles'),addArticleValidator,articleController.createArticle)

router.route('/categories')
.post(auth('createAny','categories'),articleController.createCategory)
.get(auth('readAny','categories'),articleController.getAllCategories)

router.route('/articles/:id')
.get(auth('readAny','articles'),articleController.getArticleById)
.patch(auth('updateAny','articles'),articleController.updateArticle)
.delete(auth('deleteAny','articles'),articleController.deleteArticle)

router.route('/users/article/:id')
.get(articleController.getUserArticleById)

router.route('/all')
.get(articleController.getAllArticles)
.post(articleController.getMoreArticles)

router.post('/admin/paginate',auth('readAny','articles'),articleController.getAdminPaginateArticles)

module.exports=router;