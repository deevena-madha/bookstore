var express=require('express');
var expapp=express();
var movieslist=[{Title : 'Ala Vaikuntapuramlo', YearOfRelease : '2020'},
{Title : 'Unbeatables', YearOfRelease : '2019'}, {Title : 'Deva', YearOfRelease : '2019'}];

function getMovies(request, response){

response.json(movieslist);

}

function getMovie(request, response)
{
    var movieyear=request.params.year;
    console.log("In getMovie....");
    var str='<html><body>';
    //var movies=JSON.parse(movieslist);
    for(i=0;i<movieslist.length;i++)
    {
       var movie=movieslist[i];
      // console.log(movie.Title + ", " + movie.YearOfRelease);
        if(movie.YearOfRelease == '2020'){
            str+='<B>Movie Title</B>&nbsp;' + movie.Title + '</B>';
            str+='<br><b>Year</b>&nbsp;' + movie.YearOfRelease + '</b><BR>';
        }
        str +='</body></html>';
    }
   // response.send(str);
}

expapp.get('/getMovies', getMovies);
expapp.get('/getMovie/:year', getMovie);
expapp.listen(8081, function(){ console.log("Servering running on port 8081");});