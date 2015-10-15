// =============Map
// Parse.$ = jQuery;
//
// Parse.initialize('BbWG8zghqYP2NOgrKHGIm8h1dcwNG0fG954uRaqv',
// '5PcVN5PJmRdLADqMSF2zdI5xfFI6nS43iWzrN4Ep'); // APPKEY, JAVASCRIPTKEY

$(function() {

  var map;
  var markers = [];

  $(document).ready(init);

  function init() {
    initMap(41.67, -86.25, 11);
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //Query the database for all events and map the location
    var Club = Parse.Object.extend("Clubs");
    var query = new Parse.Query(Club);
    query.descending("createdAt");

    query.find({
      success: function(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          createMarker(object.get('Address'), object.id, object.get('Name'));
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

  function createMarker(address, id, name){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var latLng = new google.maps.LatLng(lat,lng);
        var marker = new google.maps.Marker({map: map, position: latLng, id: id, title:name});
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
          window.location.replace('./results.html?id=' + this.id + '&name='+this.title); });

      } else {
        console.log("Request to add marker to map failed.")
      }
    });
  }
});
