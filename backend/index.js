require("dotenv").config(); 
const app = require("./app"); 

const PORT = process.env.PORT || 4000; 

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at: http://localhost:${PORT}`);
});
