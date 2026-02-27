import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------------
// CONFIGURACIÓN DEL SERVIDOR
// ---------------------------
const PANEL_URL = "https://panel.lynxnodes.es";
const SERVER_ID = "6bcbc51d";
const API_KEY = "ptlc_HWMnLXZqSCs";// <-- PON AQUÍ TU API KEY

// ---------------------------
// SUBIR O EDITAR ARCHIVO
// ---------------------------
app.post("/upload", async (req, res) => {
    const { path, content } = req.body;

    try {
        const response = await fetch(
            `${PANEL_URL}/api/client/servers/${SERVER_ID}/files/write?file=${encodeURIComponent(path)}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "text/plain",
                    "Accept": "application/json"
                },
                body: content
            }
        );

        res.json({ ok: true, message: "Archivo subido correctamente." });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

// ---------------------------
// ENVIAR COMANDO A LA CONSOLA
// ---------------------------
app.post("/command", async (req, res) => {
    const { command } = req.body;

    try {
        await fetch(
            `${PANEL_URL}/api/client/servers/${SERVER_ID}/command`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ command })
            }
        );

        res.json({ ok: true, message: "Comando enviado." });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

// ---------------------------
// REINICIAR EL SERVIDOR
// ---------------------------
app.post("/restart", async (req, res) => {
    try {
        await fetch(
            `${PANEL_URL}/api/client/servers/${SERVER_ID}/power`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ signal: "restart" })
            }
        );

        res.json({ ok: true, message: "Servidor reiniciado." });
    } catch (err) {
        res.json({ ok: false, error: err.message });
    }
});

app.listen(3000, () => console.log("Backend Nexus listo en puerto 3000"));
