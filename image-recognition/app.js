var express = require ("express");
//creating the express server
var app = express();

app.get("/test", function(req, res){
    var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
    var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'yBTV0Kd54On4MH7s8u4ecanbl_JT-mQ6NWyuKEpTZoNz'
    });
      
    //var images_file = fs.createReadStream('./picture.jpg');
    //var classifier_ids = ["food"];
    var params = {
        url:"https://www.t-mobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-x/silver/Apple-iPhoneX-Silver-1-3x.jpg"
    };

    //asynchronous javascript call
    visualRecognition.classify(params, function(err, response) {
        if (err)
            console.log(err);
        else{
            //Store response into a string
            var result = JSON.stringify(response, null, 2)
            res.end(result)
            console.log(result)
        }
    });

})

var listener = app.listen(process.env.PORT,process.env.IP,function(){
//var listener = app.listen(4000,process.env.IP,function(){
    //var listener = app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server has started");
    console.log('Listening on port ' + listener.address().port);
});
    