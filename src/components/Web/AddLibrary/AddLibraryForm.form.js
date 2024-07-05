import * as Yup from "yup";

export const initialValues = () => {
    return { code: "" }
}

export const validationSchema = () => {
    return Yup.object({
        code: Yup.string().required("El código es requerido").min(3, "El código debe tener al menos 3 caracteres")
    })
} 