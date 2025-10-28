const articleServices = require('../Services/articleServices')
const httpstatus = require('http-status')

const articleController = {
    async createArticle(req, res, next) {
        try {
            const article = await articleServices.addArticle(req.body)
            res.json({
                status: httpstatus.CREATED,
                message: 'Article created successfully',
                data: article
            })
        }
        catch (error) {
            next(error)
        }
    },
    async getArticleById(req, res, next) {
        try {
            const article = await articleServices.findArticleById(req.params.id, req.user);
            if (!article) {
                return res.status(httpstatus.NOT_FOUND).json({
                    status: httpstatus.NOT_FOUND,
                    message: 'Article not found',
                });
            }
            res.json({
                status: httpstatus.OK,
                message: 'Article fetched successfully',
                data: article,
            });
        }
        catch (error) {
            next(error)
        }
    },
    async updateArticle(req, res, next) {
        try {
            const article = await articleServices.updateArticleById(req.params.id, req.body);
            res.json({
                status: httpstatus.OK,
                message: 'Article updated successfully',
                data: article,
            });
        }
        catch (error) {
            next(error)
        }
    },
    async deleteArticle(req, res, next) {
        try {
            await articleServices.deleteArticleById(req.params.id);
            res.status(httpstatus.OK).json({
                status: httpstatus.OK,
                message: 'Article deleted successfully',
                action: 'deleted'
            });
        }
        catch (error) {
            next(error)
        }
    },
    async getUserArticleById(req, res, next) {
        try {
            const article = await articleServices.findUserArticleById(req.params.id, req.user);
            console.log("Article: ", article);

            res.json({
                status: httpstatus.OK,
                message: 'Article fetched successfully',
                data: article,
            });
        }
        catch (error) {
            next(error)
        }
    },
    async getAllArticles(req, res, next) {
        try {
            const articles = await articleServices.findAllArticles(req);
            console.log("Articles: ", articles);

            res.json({
                status: httpstatus.OK,
                message: 'All Articles fetched successfully',
                data: articles,
            });
        }
        catch (error) {
            next(error)
        }
    },
     async getMoreArticles( req, res, next) {
        try {
            const articles = await articleServices.findMoreArticles(req);
            console.log("Articles: ", articles);
            
            res.json({
                status: httpstatus.OK,
                message: 'Articles fetched successfully',
                data: articles,
            });
        }
        catch (error) {
            next(error)
        }
    },
      async getAdminPaginateArticles(req, res, next) {
        try {
            const articles = await articleServices.findAdminPaginateArticles(req);
            console.log("Articles: ", articles);
            
            res.json({
                status: httpstatus.OK,
                message: 'Articles fetched successfully',
                data: articles,
            });
        }
        catch (error) {
            next(error)
        }
    },
      async createCategory(req, res, next) {
        console.log("createCategory", req.body);

        try {
            const category = await articleServices.addCategory(req.body);
            res.json({
                status: httpstatus.CREATED,
                message: 'Category created successfully',
                data: category,
            });
        }
        catch (error) {
            next(error)
        }
    },
      async getAllCategories(req, res, next) {
        try {
            const categories = await articleServices.findAllCategories();
            res.json({
                status: httpstatus.OK,
                message: 'Categories fetched successfully',
                categories,
            });
        }
        catch (error) {
            next(error)
        }
    }

}

module.exports=articleController;