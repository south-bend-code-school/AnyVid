Parse.$ = jQuery;


Parse.initialize('wRSnKj1N95weLt90DMwZMgn19jHuh0Az80Lc16Q8',
'eHrj5lHvoc3y5tKAdRb5pI7LoAyjkcTwQMkFM1wL'); // APPKEY, JAVASCRIPTKEY

(function(){

  $(document).ready(init);

  function init() {
    $('#submit_button').on('click', createNew);
  }

  function createNew(event){
    event.preventDefault();
    var vid = new Parse.Object('Vid');
    var youTubeURL = $('#videoURL').val().split('=');
    var videoURL = youTubeURL[1];
    var description = $('#description').val();
    var name = $('#name').val();
    var location = $('#location option:selected').text();
    var category = $('#category option:selected').text();

    vid.set('videoURL', videoURL);
    vid.set('description', description);
    vid.set('name', name);
    vid.set('location', location);
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
