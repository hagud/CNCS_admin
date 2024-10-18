import * as Yup from "yup";

export const initialValues = () => {
    return {
        name: "",
        code: "",
        branch_type_id: null,
        parent: null,
        isParent: true,
        parentName: "",
        category: "",
        phone: "",
        fax: "",
        email: "",
        address: "",
        zip: "",
        city: null,
        state: null,
        community: null,
        base_url: "",
        catalog_url: "",
        loan_center: true,
        loan_service: true,
        loan_rate: 0,
        limit_service: 1,
        software_id: null,
        users: []
    }
}

export const validationSchema = () => {
    return Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        code: Yup.string().required("El código es requerido").min(3, "El código debe tener al menos 3 caracteres"),
        branch_type_id: Yup.number().required("El tipo de biblioteca es requerido"),
        phone: Yup.string().required("El teléfono es requerido"),
        email: Yup.string().email("El email no es válido").required("El email es requerido"),
        city: Yup.number().required("La ciudad es requerida"),
        community: Yup.number().required("La comunidad es requerida"),
    })
} 