import { configureStore } from "@reduxjs/toolkit";
import usersreducer from './reducers/users'
import notificationsReducer from './reducers/notifications'
import siteReducer from './reducers/site'
import articlesReducer from './reducers/articles'

const store=configureStore({
    reducer:{
        users:usersreducer,
        notifications:notificationsReducer,
        site:siteReducer,
        articles:articlesReducer
    }
})
export default store;