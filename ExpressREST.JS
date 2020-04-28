var express=require('express');
var exapp=express();
var movieslist=[{"Title" : "Ala venkatapuramlo", "YearOfRelease" : 2020},
{"Title" : "Unbeatables", "YearOfRelease" : "2019"}, {"Title" : "Deva", "YearOfReleases":"2019"}];
function getMovies(request, response){
    response.json(movieslist);

}
exapp.get('/getMovies', getMovies);

exapp.listen(8081, function(){ console.log("server running on port 8081");});
