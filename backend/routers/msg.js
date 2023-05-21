const router = (app, enviar) => {
    app.post('/send', async (req, res) => {
        const { msg, groupName, times } = req.body;
        
        if ( !msg || !groupName || !times ) {
            return res.status(400).json({ err: "Algun campo no esta completado" });
        }
    
        if (times > 10 || times < 1) {
            return res.status(400).json({ err: "Las veces deben estar entre 1 y 10." });
        }

        const enviat = await enviar({ msg: msg, group: groupName, times: times });
    
        if ( enviat ) {
            console.log(`"${msg}" ha sido enviado a "${groupName}"`);
            return res.json({ msg: `"${msg}" ha sido enviado a "${groupName}" ${times} veces.` });
        } else {
            console.log(`Error al enviar mensaje`);
            return res.status(400).json({ err: "Error al enviar mensaje" })
        }
    });
}

module.exports = router;