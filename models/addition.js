let add = function( x,y) {
    console.log("value of x:" +x+ " and value of y:" +y);
    return new Promise(function(resolve, reject){
        if(x<0){
            reject("x should be greater than 0")
        }else{
            resolve(x+y);
        }
    }) 
}

exports.add= add;