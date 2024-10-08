import express from 'express';
const port = 3001;
const app = express();

app.get("/store", (req, res) => {
    res.send("Hello from store");
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
    console.log(err);
});

app.post('/login', (req, res) => {
    res.send("Hello from login");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})


