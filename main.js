Parse.$ = jQuery;


Parse.initialize('wRSnKj1N95weLt90DMwZMgn19jHuh0Az80Lc16Q8',
'eHrj5lHvoc3y5tKAdRb5pI7LoAyjkcTwQMkFM1wL'); // APPKEY, JAVASCRIPTKEY


(function(){

  $(document).ready(init);

  function init() {
    $('#searchCategories').on('change', goToPage);
    parseId();
  }

  function goToPage(category) {
    var category = $('#searchCategories option:selected').val();
    window.location.replace('./results.html?id=' + category);
  }

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  }

  function parseId() {
  //var uri = window.location.search.split('=');
  var category = getURLParameter('id');
  var name = getURLParameter('name');

  if(name) {
    $('#catHeader').append('<h1>' + name + '</h1>');
  }
  else {
    $('#catHeader').append('<h1>' + category + '</h1>');
  }

  var vid = Parse.Object.extend('Vid');
  var query = new Parse.Query(vid);
  if(!name) {
    query.equalTo('category', category);
  } else {
    var Club = Parse.Object.extend("Clubs");
    // POINTER
    var club = new Club();
    club.id = category;
    query.equalTo('clubID', club );
  }

  query.include('clubID');
  query.find({
    success: function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var video = object.get('videoURL');
        var club = object.get('clubID');
        var name = club.get('Name');
        var html =  '<div class="indVid">' +
                    '<div class="vidDiv">' +
                    '<iframe src="https://www.youtube.com/embed/'+video+'" frameborder="0" allowfullscreen></iframe>' +
                    '</div>' +
                    '<div class="vidText">' +
                    '<h2>Name:</h2>' +
                    '<h4>' + object.get('name') + '</h4>' +
                    '<h2>Desription:</h2>' +
                    '<h4>' + object.get('description') + '</h4>' +
                    '<h2>Club:</h2>' +
                    '<h4>' + name + '</h4>' +
                    '</div>' +
                    '</div>';
        $('#videoResults').append(html);
      }
    },
    error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
  });

}


})();
