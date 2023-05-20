const router = (app, enviar) => {
    app.post('/send', async (req, res) => {
        const { msg, groupName } = req.body;
        
        if ( !msg || !groupName ) {
            return res.status(400).json({ err: "Algun campo no esta completado" });
        }
    
        const enviat = await enviar({msg: msg, group: groupName});
    
        if ( enviat ) {
            console.log(`"${msg}" ha sido enviado a "${groupName}"`);
            return res.json({ msg: `"${msg}" ha sido enviado a "${groupName}"` });
        } else {
            console.log(`Error al enviar mensaje`);
            return res.status(400).json({ err: "Error al enviar mensaje" })
        }
    });
}

module.exports = router;