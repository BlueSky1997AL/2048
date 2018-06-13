const express = require('express');
const app = express();

app.use(express.static('./es5/'));

app.listen(3000, () => {
    console.log(`Server is running on localhost:3000`);
});