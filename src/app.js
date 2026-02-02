import express from "express"
import cors from "cors"
const app = express()

//basic configurstions
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//CORS configurations
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.get("/", (req,res) =>{
    res.send("this is homepage of basecampy")
})

export default app