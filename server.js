const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const fs=require('fs');
const app=express();
const bcrypt=require('bcrypt');
// mongoose.connect("mongodb://localhost/selling").then(()=>console.log('connected')).catch(err=>console.error("could not connected",err));
mongoose.connect("mongodb+srv://ecom:ecom@ecom.xgqwj.mongodb.net/test",
{useUnifiedTopology:true,useNewUrlParser:true},
()=>{
  console.log("connected to db")
})




 //signup data schema

const sellSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:
    {
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },

password1:{
        type:String,
        require:true,
        minLength:6
    },
    contact:
    {
             type:String,
            require:true,
            unique:true,
            minLength:10
    },
    token:
    {
        type:String
    }
})
const sell=mongoose.model('selling',sellSchema);




// reselling item schema


const reselSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
    type:String,
    require:true
    },
    pehchan:{
        type:String,
        require:true,
    },
    plusminus:{
        type:Number
        },
    imageName: {
           type:String,
           require:true
        },
        ext :{
            type:String,
 require:true
        }
})

const resell=new mongoose.model("resell",reselSchema);




//cart item schema


const cartSchema=new mongoose.Schema({

    price:{
        type:String,
        require:true
    },
    item:{
        type:String,
        require:true
    },
    counter:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    id:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    total:{
        type:String,
        require:true
    }
})
const cart=new mongoose.model("cartItems",cartSchema);




//address schema


const addressSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    pincode:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
})

const address=new  mongoose.model('address',addressSchema);





 //purchase schema


const purchaseSchema=new mongoose.Schema({
        item:{
            type:String,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        counter:{
            type:Number,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        category:{
            type:String,
            require:true
        },
        id:{
            type:String,
            require:true
        }

});

const purchase=new mongoose.model('purchase',purchaseSchema);




//admin schema

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

const admin=new mongoose.model('admin',adminSchema);

const totalSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    sum:{
        type:String,
        require:true
    }
});

const total=new mongoose.model('total',totalSchema);





const _=require('lodash');
var bodyParser=require('body-parser');
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","PUT","GET","POST","DELETE","OPTIONS");
    res.setHeader('Access-Control-Allow-Headers',"Origin,x-auth,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Expose-Headers","x-auth");
    next();
});

app.use(bodyParser.json({limit: '50mb'}));



//signup api
app.post('/reg',(req,res)=>
{
                console.log(req.body);
                sell.findOne({email:req.body.email}).then((result)=>{
                if(!result){
                sell.findOne({contact:req.body.contact}).then((result)=>{
                if(!result) {
                bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                if(err)
                    {
                    res.send(err);
                    }else{
                    var user=new sell({name:req.body.name,
                    email:req.body.email,
                    password:hash,
                    password1:req.body.password1,
                    contact:req.body.contact,
                    token:req.body.token });


                  user.save().then((result=>{
                  let token=jwt.sign({sub:result._id.toHexString()},'secretKey').toString();
                 console.log(token);
                 result.token=token;
                 result.save().then((ress)=>{
                 res.status(200).header('x-auth',token).send({"token":token});
                 }).catch((err)=>{
                 res.send(err);
                  });
                  })).catch((err)=>{
                  res.status(400).send(err);
                  })
                  }
                  });
                  });

                  }
                   else
                  {res.status(403).send({"msg":"contact already exists"});}

                  })
                  }else{
                  res.status(403).send({"msg":"email already exists"});
                  }
                  })
    });




//login api
app.post('/login',(req,res)=>{
              sell.findOne({email:req.body.name},(err,user)=>{
             // console.log(user);
               if(err){console.log(err);}
               else{
               if(!user){
               res.status(406).send('invalid email') ;
               }else
               {
               return bcrypt.compare(req.body.password,user.password,(err,resu)=>{
               console.log(resu);
               if(err){
               res.status(403).send(err);
               }
               else if(!resu)
               {
               res.status(401).send("invalid password");
               }else{
               let token=jwt.sign({sub:user._id.toHexString()},'secretKey').toString();
               console.log(token);
               user.token=token;
               user.save().then((ree)=>{
               res.status(200).header('x-auth',token).send({"token":token});
               }).catch((err)=>{
               res.send(err);
               });
            }
        });
    }
    }
});
});





//find data of user that signup and login also
app.post('/data',(req,res)=>{
            sell.findOne({token:req.body.token},(err,result)=>{
            if(err){console.log(err);}
            else{
            res.send(result);
            console.log(result);
            }
    });
});




//storing data of selling
app.post('/sellData',(req,res)=>{

     var data=new resell({title:req.body.title,price:req.body.price,category:req.body.category,pehchan:req.body.pehchan,plusminus:req.body.plusminus,ext:req.body.ext});
     data.imageName=data._id;
     console.log(data.imageName);
     console.log(req.body.name);
     let url=req.body.name+'.'+req.body.ext;
     let buffer= new Buffer(req.body.imageUrl,"base64");
     console.log(buffer);
     return fs.writeFile('./backend/images/'+data.imageName+"."+req.body.ext,buffer,(err,ret)=>{
             if(err)
             {
             res.send('error');
             }
             else{
                console.log("done");
                return data.save().then((result)=>{
                console.log(result);
                console.log(result.price);
                console.log(result.title);
                res.send(result);
                }).catch((err)=>{
                res.send(err);
              });
            // res.send(ret);
        }
    });

});



//finding item according to the user that he sold yet
app.post('/findresel',(req,res)=>{
    console.log(req.body.pehchan);
    resell.find({pehchan:req.body.pehchan},(err,result)=>{
    if(err){console.log(err);}
    else{
    console.log(result);
    res.send(result);
    }
    });
});




//finding all the sold data not according to user that sold yet
app.post('/showReselData',(req,res)=>{

        console.log(req.body);
        resell.find().then((result)=>{
        console.log(result);
        // let path='./backend/images/'+result[0].imageName+'.'+result[0].ext;
        // console.log(path);
        // fs.readFile(path,'base64',(err,buffer)=>{
        // let image=buffer.toString('base64');
        // let resu={"image":image};
        res.status(200).send(result);
        // });


}).catch((err)=>{
 res.send(err);
});

});

app.post('/img',(req,res)=>{

 let path='./backend/images/'+req.body.imageName+'.'+req.body.ext;
        console.log(path);
        fs.readFile(path,'base64',(err,buffer)=>{
        // let image=buffer.toString('base64');
        let image=buffer;
        let resu={"image":image};
  res.send({"buffer":resu});
});

});


// update data of the user
app.post('/update_profile',(req,res)=>{
sell.find({email:req.body.email}).then((result)=>{
result[0].contact=req.body.contact;
result[0].name=req.body.name;
console.log("update"+result);
result[0].save().then((resu)=>{
res.send(resu);
}).catch((err)=>{
res.send(err);
});
});
});




// adding the item that is to go in cart
app.post('/cart',(req,res)=>{

    cart.find({id:req.body.id}).then((result)=>{
    // console.log(result[0].id);
    if(!result[0]){
var cartData=new cart(req.body);
    cartData.save().then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
}else{
   result[0].counter=req.body.counter;
   result[0].save().then((resu)=>{
       res.send(resu);
   }).catch((err)=>{
       console.log(err);
   })
}
    })

})




//find the cart item by email
app.post('/findCart',(req,res)=>{
    cart.find({email:req.body.email}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
});




//delete the item from the cart
app.post('/deleteCart',(req,res)=>{
cart.findOneAndRemove({id:req.body.id}).then((result=>{
    console.log(result[0]);
    res.send(result);
})).catch((err)=>{
    res.send(err);
})
});





//address api
app.post('/address',(req,res)=>{
    address.findOne({address:req.body.address}).then((result)=>{
        if(!result)
        {
            var add=new address(req.body);
            add.save().then((result)=>{
                res.send(result);
            }).catch((err)=>{
                res.send(err);
            });
        }else{
            res.send("address already exists");
                }
    }).catch((err)=>{
        res.send(err);
    })

});





//find address according to the user
app.post('/findAddressAccToUser',(req,res)=>{
    address.find({email:req.body.email}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});



app.post('/purchasedProduct',(req,res)=>{
    var p;
    var ctr=0;
    for(let i=0;i<req.body.length;i++){
        p=new purchase(req.body[i]);
        p.save().then((result)=>{

            ctr=+1;
        }).catch((err)=>{
            res.send(err);
        });
    }
    console.log(req.body.length);
    if(ctr==req.body.length){
        res.send({"status":"done"});
    }



});


//find the purchased item according to the user
app.post('/findPurchased',(req,res)=>{
    purchase.find({email:req.body.email}).then((result)=>{
       console.log(result);
        res.send(result);
        }).catch((err)=>{
            res.send(err);
        });
});




//admin signup api
app.post("/admin",(req,res)=>{
    var dt=new admin(req.body);
    dt.save().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});





//admin login api
app.post("/adminFind",(req,res)=>{
    console.log(req.body);
   admin.findOne({email:req.body.email},(err,result)=>{
       if(err)
       {
           res.send(err);
       }else if(!result)
       {
res.status(401).send("invalid email");
       }else{
           if(result.password!==req.body.password)
           {
               res.status(403).send("invalid password");
           }else
           {
               res.status(200).send(result);
           }
       }
   });
});






//find purchase item for admin
app.post('/findPurchase',(req,res)=>{
    purchase.find().then((result)=>
    {
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});




//category find mobile,laptop,drone.action,dslr,tv,accessories
app.post('/mobile',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});



app.post('/laptop',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});



app.post('/drone',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});


app.post('/action',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});



app.post('/dslr',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});



app.post('/tv',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});




app.post('/accessories',(req,res)=>{
    console.log(req.body);
    resell.find({category:req.body.category}).then((result)=>{
        console.log(result);
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});




//deleting the sold item in account component
app.post('/deleteSold',(req,res)=>{
    console.log(req.body);
    resell.findOneAndRemove({_id:req.body.id}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
})



//find all user to admin
app.post('/findAll',(req,res)=>{
    sell.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});

app.post("/total",(req,res)=>{
    var dt=new total(req.body);
    dt.save().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    });
});
port=process.env.port || 3000;
app.listen(port,(res)=>{
    console.log(`listen on port ${port}`);
});



