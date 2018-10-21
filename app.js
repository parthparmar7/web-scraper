var fs= require('fs');
var express=require('express');
var request=require('request');
var cheerio=require('cheerio');
var app=express();

 app.get('/scrape',function(req,res){

    url = 'https://www.imdb.com/title/tt1270797/';

    request(url, function(error,response,html){
    if(!error){

        var $ = cheerio.load(html);
        var title, release, rating;
      var json = { title : "", release : "", rating : ""};

    $('.title_wrapper').filter(function(){
        var data=$(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;

        })
      
     $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }


    fs.writeFile('output.json',JSON.stringify(json,null,4),function(err){

        console.log('Output.json has all the scraped data');   
    })

    res.send('\nConsole Check');
        })                                    
    })  
 
app.listen('8081');
console.log('Server Running');
exports=module.exports = app;

