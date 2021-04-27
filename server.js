const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, "public")));

// app.get("/sw.js", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "/src/sw.js"));
// });

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
  
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`)
})