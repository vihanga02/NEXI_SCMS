import express from 'express';

const app = express();

app.get("/store", (req, res) => {
    res.send("Hello from store");
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
    console.log(err);
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})
