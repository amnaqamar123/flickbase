import * as Yup from 'yup';

export const formValues = {
    title: "",
    content: "",
    excerpt: "",
    score: "",
    director: "",
    actors: [],
    status: "draft",
    category: ""
}


export const validation = () => (
    Yup.object({

        title: Yup.string()
            .required("Title is required")
            .max(100, "Title cannot exceed 100 characters"),


        content: Yup.string()
            .required("Content is required"),


        excerpt: Yup.string()
            .required("Excerpt is required")
            .max(500, "Excerpt cannot exceed 500 characters"),


        score: Yup.number()
            .required("Score is required")
            .min(0, "Score must be at least 0")
            .max(100, "Score cannot exceed 100"),

        director: Yup.string()
            .required("Director is required"),


        actors: Yup.array()
            .of(Yup.string().trim())
            .min(2, "At least 2 actors are required")
            .required("Actors are required"),


        status: Yup.string()
            .oneOf(['draft', 'public'], "Status must be either 'draft' or 'public'")
            .required("Status is required"),


        category: Yup.string()
            .required("Category is required")
    })
)
