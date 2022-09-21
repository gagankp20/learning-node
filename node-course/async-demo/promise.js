const p = new Promise( (reslove, reject) => {
    //async work
    setTimeout(() =>{
        reject(new Error('message'));
       // reslove(1);
        
    },2000);
    
});

p.then(result =>  console.log(result))
 .catch(err => console.log('error', err.message))