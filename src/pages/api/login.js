import { serialize } from "cookie";
import bcrypt from "bcryptjs";

const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10); // À stocker une seule fois

export default function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && bcrypt.compareSync(password, hashedPassword)) {
        const cookie = serialize("auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 jour
            path: "/",
        });

        res.setHeader("Set-Cookie", cookie);
        return res.status(200).json({ message: "Connexion réussie" });
    }

    return res.status(401).json({ message: "Identifiants incorrects" });
}
