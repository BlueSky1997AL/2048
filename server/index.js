const express = require('express');
const app = express();

app.use(express.static('./babel/'));

app.listen(80, () => {
    console.log(`Server is running on localhost:80`);
});