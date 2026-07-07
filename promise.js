const response = new Promise((resolve ,reject)=>{
    const one =10;
    if(one === 10){
        resolve({
            id:3,name:"asmi",role:"Editor"
        });
    }else{
        reject({
            message:"Failed process promise"

        });

    }
});
no
response
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });