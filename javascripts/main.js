var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
};

$(window).resize(sectionHeight);

$(document).ready(function(){
  $("section h1, section h2").each(function(){
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='http://litrin.github.io/manongliuxiwang/'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav ul li:first-child a").parent().addClass("active");
  });
  
  // $("nav ul li").on("click", "a", function(event) {
  //   var position = $($(this).attr("href")).offset().top - 190;
  //   $("html, body").animate({scrollTop: position}, 400);
  //   $("nav ul li a").parent().removeClass("active");
  //   $(this).parent().addClass("active");
  //   event.preventDefault();    
  // });
  
  $("li a[href^='https://github.com/litrin/manongliuxiwang/blob/master/']").click(function(){
    var url = $(this).attr("href");
    $(this).attr("href", "#")
    reg = RegExp("https://github.com/litrin/manongliuxiwang/blob/master/(.+\.md)")
    var file = reg.exec(url)
    console.log(file)
    var api = "https://raw.githubusercontent.com/litrin/manongliuxiwang/master/" + file[1]

    console.log(api)
    $.ajax(api).success(function(content){

      $("section").html(markdown.toHTML(content))
    }
  )
  });

  sectionHeight();
  
  $('img').load(sectionHeight);

});

fixScale = function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }


};


