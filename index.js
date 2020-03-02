const app = require("./server/server");

const port = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
