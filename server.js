const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const historyRoutes = require("./routes/historyRoutes");
const statsRoutes = require("./routes/stats.routes");

const app = express();
const port = 3000;

app.use(express.json());

// formata JSON bonito
app.set("json spaces", 2);

// conecta banco
connectDB();

// rotas
app.use(userRoutes);
app.use(videoRoutes);
app.use(historyRoutes);

// prefixo /stats
app.use("/stats", statsRoutes);

// rota inicial
app.get("/", (req, res) => {
    res.send("API de streaming funcionando");
});

// iniciar servidor (APENAS UMA VEZ)
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});