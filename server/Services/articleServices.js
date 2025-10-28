const { ArticleSchema } = require('../Model/Articles')
const { category } = require('../Model/Category')
const httpstatus = require('http-status')
const { ApiError } = require('../middleware/ApiError')

const addArticle = async (body) => {
    try {

        const article = new ArticleSchema({
            ...body,
            score: parseInt(body.score),
        })
        await article.save()
        return article
    }
    catch (error) {
        throw error
    }
}
const findArticleById = async (id, user) => {
    try {
        console.log("User: ", user);

        if (user.role == 'user') {
            throw new ApiError(httpstatus.FORBIDDEN, 'You are not allowed to access this article')
        }
        const article = await ArticleSchema.findById(id).populate('category')
        if (!article) {
            throw new ApiError(httpstatus.NOT_FOUND, 'Article not found')
        }
        return article
    }
    catch (error) {
        throw error
    }
}
const updateArticleById = async (id, body) => {
    try {
        const article = await ArticleSchema.findOneAndUpdate(
            { _id: id },
            { '$set': body },
            { new: true }
        ).populate('category');
        if (!article) {
            throw new ApiError(httpstatus.NOT_FOUND, 'Article not found')
        }
        return article
    }
    catch (error) {
        throw error
    }
}
const deleteArticleById = async (id) => {
    try {
        const article = await ArticleSchema.findByIdAndDelete(id)
        if (!article) {
            throw new ApiError(httpstatus.NOT_FOUND, 'Article not found')
        }
        return article
    }
    catch (error) {
        throw error
    }
}
const addCategory = async (body) => {
    try {

        const category = new category({
            ...body,
        })
        await category.save()
        return category
    }
    catch (error) {
        throw error
    }
}
const findAllCategories = async () => {
    try {
        const categories = await category.find({})
        return categories
    }
    catch (error) {
        throw error
    }
}
const findUserArticleById = async (id, user) => {
    try {
        const article = await ArticleSchema.findById(id).populate('category')
        console.log("Article: ", article);

        if (!article) {
            throw new ApiError(httpstatus.NOT_FOUND, 'Article not found')
        }

        if (article.status === 'draft') {
            throw new ApiError(httpstatus.FORBIDDEN, 'You are not allowed to access this article')
        }

        return article
    }
    catch (error) {
        throw error
    }
}
const findAllArticles = async (req) => {

    const sortby = req.query.sortby || '_id'
    const order = req.query.order || 'desc'
    const limit = req.query.limit || 2

    try {

        const articles = await ArticleSchema.find({ status: 'public' })
            .populate('category').sort([[sortby, order]]).limit(parseInt(limit))

        console.log("Articles: ", articles);
        return articles
    }
    catch (error) {
        throw error
    }
}
const findMoreArticles = async (req) => {
    const sortby = req.body.sortby || '_id'
    const order = req.body.order || 'desc'
    const limit = req.body.limit || 2
    const skip = req.body.skip || 0


    try {

        const articles = await ArticleSchema.find({ status: 'public' })
            .populate('category').sort([[sortby, order]]).limit(parseInt(limit))
            .skip(parseInt(skip))
        return articles
    }
    catch (error) {
        throw error
    }
}
const findAdminPaginateArticles = async (req) => {
    try {

        const aggQueryArray = []
        if (req.body.keyword && req.body.keyword.length > 0 || req.body.keyword != "") {
            const re = new RegExp(req.body.keyword, 'gi')
            console.log("Regex: ", re);

            aggQueryArray.push({ $match: { title: { $regex: re } } })
        }

        console.log("Keyword: ", req.body.keyword);
        console.log("aggQueryArray: ", aggQueryArray);



        aggQueryArray.push(
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: "$category"
            },
        )


        let aggQuery = ArticleSchema.aggregate(aggQueryArray)

        console.log("aggQuery: ", aggQuery);



        const limit = req.body.limit ? req.body.limit : 2
        const options = {
            page: req.body.page ? req.body.page : 1,
            limit: limit,
            sort: { _id: 'desc' },
        }

        const article = await ArticleSchema.aggregatePaginate(aggQuery, options)
        console.log(article);

        return article;
    }
    catch (error) {
        throw error
    }
}

module.exports = {
    addArticle,
    findArticleById,
    updateArticleById,
    deleteArticleById,
    addCategory,
    findAllCategories,
    findUserArticleById,
    findAllArticles,
    findMoreArticles,
    findAdminPaginateArticles
}