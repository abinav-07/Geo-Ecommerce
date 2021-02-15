//Require Files
const pool=require("../pools/geoEcommerce-db");

const run_query=(sql)=>{
    return new Promise((resolve,reject)=>{        
        pool.query(sql,(err,result)=>{            
            if(err) {
                reject(err)
            }else{                
                resolve(result);
            }
        })
    })
}

module.exports={
    run_query
}
