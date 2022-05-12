$('.dog').click(function (){
  getRandomDog();
});


$('.nav li').click(function () {
  changeTabs($(this));
});


$('.search').click(function (){
  var menu_length = $('#dog-menu a').length;
  if (menu_length > 0){
    return}

  else {
    generateDogMenu();
    generateBread('#african');
    $('#african').addClass('active');
  }
});


function generateBread(dog){
  var url_end = dog.slice(1)
  var URL = `https://dog.ceo/api/breed/${url_end}/images`;
  $('#dog-content').empty();
  $.get(URL, function( data ) {
      for (i = 0; i < 10; i++){renderBread(data.message[i], url_end)};
  });

}

function renderBread(element, name) {
  $('#dog-content').append(`<div class="card" style="width: 18rem;">
                            <img class="card-img-top"src="${element}" alt="Card image cap">
                            <div class="card-body">
                              <h3 class="card-text">${name}</h3>
                            </div>
                          </div>`);
}


function selectBread(dog) {
  $('#dog-menu a').removeClass('active');
  $(dog).addClass('active');
  generateBread(dog);
};

function getRandomDog() {
  var URL = 'https://dog.ceo/api/breeds/image/random';
  $.get(URL, function( data ) {
    $('#center-img').attr("src", data.message);
  });
}

function changeTabs(current) {
  $('.nav a').removeClass('active');
  var page = $(current).attr("value");
  $('.container-fluid').hide();
  $('.header').show();
  $(`#${page}`).show();
  $(current).children('a').addClass('active');
}

function generateDogMenu() {
  var URL = 'https://dog.ceo/api/breeds/list/all';
    $.get(URL, function( data ) {
      for(var key in data.message){
        var name = key.charAt(0).toUpperCase() + key.slice(1);
        $('#dog-menu').append(`<a href="#" id="${key}" class="list-group-item list-group-item-action" value="${key}">${name}</a>`)
        let dog = '#' + key;
         $(`#${key}`).click(function (){selectBread(dog);})
      }
    });
}
