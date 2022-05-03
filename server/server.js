const express = require('express');
const app=express();
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
var db;
const MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://joilnam:1234@cluster0.97ez2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
,function (error,client){
    if(error)return console.log(error);
    var db=client.db('board');
        app.listen(8080, function (){
            console.log('8080에서 서버+mongo db 작동중');
        });
        app.get('/', function(요청, 응답) {
            응답.redirect('/list')

        });
        app.get('/write', function(요청, 응답) {
            응답.render('write.ejs')
        });
        app.post('/add', function(요청, 응답) {
            응답.send('전송완료')

            db.collection('counter').findOne({name:'cinetok 게시물수 갯수'},function(error,result){
                let totalPost=result.totalPost;
                db.collection('cinetok').insertOne({_id:totalPost+1, writer:요청.body.writer,title:요청.body.title,message:요청.body.message}
                    ,function(에러,결과){
                        console.log('저장완료')
                        db.collection('counter').updateOne({name:'cinetok 게시물수 갯수'},{$inc:{totalPost:1}},function(error,result){
                            if(error){
                                return console.log(error)
                            };
                        });
                    });
            });
        });
        app.get('/list',function (요청,응답){
            db.collection('cinetok').find().toArray(function(error,row){
                응답.render('list.ejs',{cinetoks:row});
            })
        app.delete('/delete',function(req,res){
               req.body._id=parseInt(req.body._id)
                db.collection('cinetok').deleteOne(req.body,function(error,result){
                    console.log('삭제가 완료되었습니다')

                });
        })
        })
        app.get('/detail/:id', function(요청, 응답){
            db.collection('cinetok').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
                응답.render('detail.ejs', {cinetoks : 결과} )
            })
        });

        app.get('/edit/:id',function(req,res){
            db.collection('cinetok').findOne({ _id : parseInt(req.params.id) }, function(에러, 결과){
                res.render('edit.ejs', {cinetoks : 결과} )
            })
        })
        app.put('/edit',function(req,res){
           db.collection('cinetok').updateOne({_id:parseInt(req.body.id)},{$set: {writer:req.body.writer,title:req.body.title,message:req.body.message}},
               function(error,result){
               res.redirect('list')
           })
        });
});


