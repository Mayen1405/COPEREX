import Admin from "../user/user.model.js";

export const emailExists = async (email = '') => {
    const admin = await Admin.findOne({ email });
    if (admin) {
        throw new Error(`El correo: ${email} ya está registrado`);
    }
};

export const usernameExists = async (username = '') => {
    const admin = await Admin.findOne({ username });
    if (admin) {
        throw new Error(`El nombre de usuario: ${username} ya está registrado`);
    }
};

export const adminExists = async (id) => {
    const admin = await Admin.findById(id);
    if (!admin) {
        throw new Error(`El administrador con el ID proporcionado`);
    }
};