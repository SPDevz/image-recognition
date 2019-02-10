var express = require ("express");
//creating the express server
var app = express();

app.get("/test", function(req, res){
    var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
    var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'Nh1vfjJyrb44LEMnvvhiY6mPJtdbg1VPGkgVAWV_dDE3-mQ6NWyuKEpTZoNz'
    });
      
    var params = {
        url:"https://www.radiologyinfo.org/gallery-items/images/bone-xray-hands.jpg"
    };

    //asynchronous javascript call
    visualRecognition.classify(params, function(err, response) {
        if (err)
            console.log(err);
        else{
            //Store response into a string
            var result = JSON.stringify(response, null, 2)
            //note that the return data is stored in response. 
            //res.write(response.images.constructor.name +"\n")
            //res.write(response.images[0].classifiers.constructor.name +"\n")
            //res.end(response.images[0].classifiers[0].classes[0].score +"")
            
            //Get the array of the classes (category classification)
            var class_col = response.images[0].classifiers[0].classes;
            for(i = 0; i < class_col.length; i++) {
                res.write(class_col[i].class + "\t");
                res.write(class_col[i].score + "\n");
            }
            res.end("END")
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
    