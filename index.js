const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
app.listen(3000, console.log("¡Servidor encendido!"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json")) 
    res.json(canciones)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    canciones.push(cancion)
    fs.writeFileSync('canciones.json', JSON.stringify(canciones))
    res.send("Canción agregada con éxito!")
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Canción eliminada con éxito")
    })

app.put("/canciones/:id", (req, res) => {
    const {id} = req.params
    const { artista, titulo, tono} = req.body
    const cancion = {
        artista: artista,
        titulo: titulo,
        tono: tono,
        id: id
    }
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1, cancion);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Canción editada con éxito")
})