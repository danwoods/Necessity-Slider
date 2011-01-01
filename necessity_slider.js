
    //declare vars
    $('<img/>').attr('src', "js/necessity_slider/blank.png");
    var playing = 'false';
    var slide_show_action;
    var slides = ["http://c2462402.cdn.cloudfiles.rackspacecloud.com/JayZslide.jpg", "images/old_man.jpg", "images/winteer_railsroad.jpg", "images/book.jpg"];
    var slide_links = ["http://www.headcount.org/", "http://www.flickr.com/photos/george_eastman_house/3123698742/", "http://www.flickr.com/photos/library_of_congress/2179197658/", "http://www.flickr.com/photos/nationalarchives/5249510046/"];
    var cur_slide = 0;
    var video_html = '<iframe id="video_iframe" src="http://player.vimeo.com/video/15776423?autoplay=1" width="605" height="340" frameborder="0"></iframe>';
    var captions = ['Image/Video slider developed for HeadCount.org', 
                    'Instructed team members in the use of CSS, Javascript, and current web standards to create a jQuery based site.', 
                    'Developed full realty site, including admin back-end.', 
                    'Pulls the 7 most recent youtube videos. Allows users to select which video to watch.'];
                    
    var sidebars = ['<a href="http://www.headcount.org/" target="_blank">See it Live -></a>', 
                    '<a href="http://www.danwoodson.com/portfolio/TALKsite/" target="_blank">Demo -></a>', 
                    '<a href="http://www.jburkhartrealty.com/" target="_blank">See it Live -></a>', 
                    '<a href="http://www.headcount.org/headcount-multimedia/" target="_blank">See it Live -></a>'];
      
    //preload images
    $.each(slides, function (i, val) {
      $('<img/>').attr('src', val);
    });
      
    $(document).ready(function() {
//comment out following lines to have functional slide-show, otherwise, it becomes a single video
      /*$('#slide').attr('src', slides[0]);
      //video functionality
      $('#slide').bind('click', function(){ 
        $('#slide').hide();
        $('#slide_holder').append(video_html);
      });*/
      if(playing == 'false'){
        $('#slide').attr('src', slides[(cur_slide++%slides.length)]);
        $('#slide_show-sidebar').html(sidebars[cur_slide-1%sidebars.length]);
        $('#slide_show-caption').text(captions[cur_slide-1%captions.length]);
        slide_show_action = setInterval(nextSlide, 5000);
        playing = 'true';
      }
      
      function nextSlide(){
        if(playing == 'false'){
          $('#video_iframe').remove();
          $('#slide').attr('src', slides[(cur_slide++%slides.length)]);
        }
        else{
          $('#slide, #slide_show-sidebar, #slide_show-caption').fadeOut('slow', function(){
            var index = cur_slide++%slides.length;
            
            $('#slide').attr('src', slides[index]);
            $('#slide_show-caption').text(captions[index]);
            $('#slide_link').attr('href', slide_links[index]);
            $('#slide_show-sidebar').html(sidebars[index]);
            }
          );
        }
        
        $//('#slide_show-caption').text(captions[cur_slide%captions.length]);
        $('#slide, #slide_show-sidebar, #slide_show-caption').fadeIn('slow', function(){
          playing = 'true';
          }
        );
      };
      
      function prevSlide(){
        if(cur_slide == 1)
          cur_slide = 5;
        if(playing == 'false'){
          $('#video_iframe').remove();
          prev_slide = (cur_slide - 2)%slides.length;
          $('#slide').attr('src', slides[(prev_slide)]);
          cur_slide = prev_slide + 1;
        }
        else{
          $('#slide, #slide_show-sidebar, #slide_show-caption').fadeOut('slow', function(){
            prev_slide = cur_slide - 2;
            
            var index = cur_slide - 2%slides.length;
            
            $('#slide').attr('src', slides[index]);
            $('#slide_link').attr('href', slide_links[index]);
            $('#slide_show-sidebar').html(sidebars[index]);
            $('#slide_show-caption').text(captions[index]);
            }
          );
        }
        
        $('#slide, #slide_show-sidebar, #slide_show-caption').fadeIn('slow', function(){
          playing = 'true';
          }
        );
      };      
      
      //video functionality
      $('#slide').bind('click', function(){
        if(((cur_slide+1)%slides.length) == 0){
          window.clearInterval(slide_show_action);
          playing = 'false';
          load_video();
        }
      });
      
      //button functionality
      $('.slide_show_button').hide();
      
      $('#slide_show, #video_iframe, .slide_show_button').bind('mouseenter', function(){
        $('.slide_show_button').fadeIn('slow');
        window.clearInterval(slide_show_action);
      });
      
      $('#video_iframe, #slide_show').bind('mouseleave', function(){
        $('.slide_show_button').fadeOut('slow');
        if(playing == 'true'){
          slide_show_action = setInterval(nextSlide, 5000);
        }
      });
      
      $('#slide_show-next_btn').bind('click', function(){
        nextSlide();
      });
      
      $('#slide_show-prev_btn').bind('click', function(){
        prevSlide();
      });
      
      function load_video(){
        $('#slide').hide();
        $('#slide_holder').append(video_html);
      };
      
    });