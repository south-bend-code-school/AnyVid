Parse.$ = jQuery;


Parse.initialize('wRSnKj1N95weLt90DMwZMgn19jHuh0Az80Lc16Q8',
'eHrj5lHvoc3y5tKAdRb5pI7LoAyjkcTwQMkFM1wL'); // APPKEY, JAVASCRIPTKEY

(function(){

  $(document).ready(init);

  function init() {
    $('#submit_button').on('click', createNew);

    var Club = Parse.Object.extend("Clubs");
    var query = new Parse.Query(Club);
    query.descending("createdAt");

    var defaulthtml =  '<option>Select B&G Club</option>';
    $("#location").append(defaulthtml);

    query.find({
      success: function(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var html =  '<option value="' + object.id + '">' + object.get('Name') + '</option>';
          $("#location").append(html);
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  }

  function createNew(event){
    event.preventDefault();
    var vid = new Parse.Object('Vid');
    var youTubeURL = $('#videoURL').val().split('=');
    var videoURL = youTubeURL[1];
    var description = $('#description').val();
    var name = $('#name').val();
    var clubId = $('#location option:selected').val();
    var category = $('#category option:selected').text();

    vid.set('videoURL', videoURL);
    vid.set('description', description);
    vid.set('name', name);
    var club = new Parse.Object('Clubs');
    club.id = clubId;
    vid.set('clubID', club);  
    vid.set('category', category);

    vid.save(null, {
      success: function(destination){
        window.location.replace('index.html');
      },
      error: function(destination, error){
        alert('error code '+error.code+': '+error.message);
      }
    });
  }
})();
