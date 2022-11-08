const bcrypt = require('bcrypt'); 

async function run(){
   const key =  await bcrypt.genSalt(10);
  const hashed =await bcrypt.hash('1234', key);
   console.log(key);
   console.log(hashed);
}

run();
