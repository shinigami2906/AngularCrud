let   mongoose = require('mongoose');
let router = require('express').Router();
let SinhVien = mongoose.model("SinhVien");

router.get('/sinhvien/:id', function(req, res, next){
    SinhVien.findById(req.params.id).then(function(sinhvien){
      if(!sinhvien){ return res.sendStatus(401); }
      console.log("GET complete")
      return res.json({ sinhvien: sinhvien.toProfileJSON()});
    }).catch(next);

  });

router.get("/sinhviens", (req,res,next) =>{
  SinhVien.find({}).then((sinhviens) =>{
    console.log("GET_ALL complete")
    let list = [];
    sinhviens.forEach((sinhvien,index) =>{
      list.push(sinhvien.toProfileJSON())
    })
    return res.json({sinhviens: list})
  }).catch(next);
})

router.post('/sinhvien', (req,res,next) =>{
    console.log(req.body)
    let sinhvien  = new SinhVien({
        username: req.body.username,
        email : req.body.email,
        age : req.body.age,
        name : req.body.name,
        sex: req.body.sex,
    });
    sinhvien.save().then((sv) =>{
        if (!sv) return res.sendStatus(401);
        else {
            console.log("POST complete")
            return res.json({ sinhvien: sinhvien.toProfileJSON()})
        }
    }).catch(next);
  
})

router.put('./sinhvien', (req,res,next) =>{
    SinhVien.findById(req.body.id).then((sv) =>{
        if(!sv || err){ return res.sendStatus(401); }
        if(typeof req.body.age !== 'undefined'){
          sv.age = req.body.age;}
        if(typeof req.body.name !== 'undefined'){
          sv.name = req.body.name;}
        if(typeof req.body.name !== 'undefined'){
          sv.sex = req.body.sex;}
        return sv.save().then(function(){
            console.log("UPDATE complete")
            return res.json({
            user: sv.toProfileJSON()});
        });
      }).catch(next);
})

router.delete('/sinhvien/:id', function(req, res, next){
    SinhVien.findById(req.params.id).then(function(sinhvien){
        if(!sinhvien){ return res.sendStatus(401); }
        SinhVien.deleteOne({_id : req.params.id}).then(() =>{
            console.log("DELETE complete")
            return res.json({})})
      }).catch(next);
  });
module.exports =  router;