import * as Yup from "yup";

export const initialValues = () => {
    return {
        name: "",
        code: "",
        branches_type_id: 0,
        parent: null,
        parentName: ""
    }
}

export const validationSchema = () => {
    return Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        code: Yup.string().required("El código es requerido").min(3, "El código debe tener al menos 3 caracteres"),
        branches_type_id: Yup.number().required("El tipo de biblioteca es requerido"),
    })
} 