import React, { useEffect } from "react";
import { useFormik } from "formik";
import { formValues, validation } from "./validationschema";
import { AdminTitle, errorHelper, Loader } from "../../../../utils/tools";
import {
    TextField, Button, Divider,
    Select, FormControl, MenuItem, FormHelperText, InputLabel
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from "../../../../store/actions/articles";
const AddArticle = () => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch()
    console.log("Articles state:", articles);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {
            console.log("Form submitted with values: ", values);
        }
    })

    useEffect(() => {
        dispatch(getCategories())

    }, [dispatch])
    return (
        <div>

            <AdminTitle title='Add Articles' />
            <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form_group">
                    <TextField
                        style={{ width: '100%' }}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}
                    />


                </div>
                <div className="form_group">
                    WYSIWYG

                </div>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="excerpt"
                        label="Enter a description"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...formik.getFieldProps('excerpt')}
                        {...errorHelper(formik, 'excerpt')}
                    />
                </div>
                <Divider className="my-3" />

                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="score"
                        label="Enter a score"
                        variant="outlined"
                        type="number"
                        {...formik.getFieldProps('score')}
                        {...errorHelper(formik, 'score')}
                    />
                </div>
                <div className="form_group">ACTORS</div>

                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="director"
                        label="Enter a director"
                        variant="outlined"
                        {...formik.getFieldProps('director')}
                        {...errorHelper(formik, 'director')}
                    />
                </div>
                <Divider className="my-3" />
                <FormControl fullWidth>
                    <InputLabel id="status-label">Select a Status</InputLabel>
                    <Select
                        label="Select a Status"
                        name="status"
                        value={formik.values.status}
                        {...formik.getFieldProps('status')}
                        error={formik.errors.status && formik.touched.status ? true : false}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>

                    {formik.touched.status && formik.errors.status ? (
                        <FormHelperText error={true}>{formik.errors.status}</FormHelperText>
                    ) : null}
                </FormControl>
                <Divider className="my-3" />

                <FormControl fullWidth>
                    <InputLabel id="category-label">Select a Category</InputLabel>
                    <Select
                        label="Select a Category"
                        name="category"
                        value={formik.values.category}
                        {...formik.getFieldProps('category')}
                        error={formik.errors.category && formik.touched.category ? true : false}
                    >


                        {articles.categories.length ? (
                            articles.categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="" disabled>No categories available</MenuItem>
                        )}
                    </Select>

                    {formik.touched.category && formik.errors.category ? (
                        <FormHelperText error={true}>{formik.errors.category}</FormHelperText>
                    ) : null}
                </FormControl>
                <Divider className="my-3" />

                {articles.loading ? (
                    <Loader />
                ) : (
                    <div className="form-group">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            <span>Add Article</span>
                        </Button>
                    </div>
                )}


            </form>
        </div>



    )
}
export default AddArticle;
