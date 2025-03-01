import { hash, verify } from "argon2";
import Admin from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const { body: data } = req;
        const encryptedPassword = await hash(data.password);
        
        const admin = await Admin.create({
            ...data,
            password: encryptedPassword,
        });

        return res.status(201).json({
            message: "El administrador ha sido creado",
            name: admin.name,
            email: admin.email
        });
    } catch (err) {
        console.error("Error al registrar el administrador:", err);
        return res.status(500).json({
            message: "Error al registrar el administrador",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el administrador con el correo ingresado"
            });
        }

        const validPassword = await verify(admin.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(admin.id);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            adminDetails: {
                token
            }
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            message: "Inicio de sesión fallido, error del servidor",
            error: err.message
        });
    }
};