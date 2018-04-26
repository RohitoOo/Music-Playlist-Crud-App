
$(document).ready(function() {

  $('.delete-song').on('click' , function(e) {
    $target = $(e.target)
    const id = $target.attr('data-id');

      $.ajax({
        type:'DELETE',
        url:'/songs/'+id,
        success: function(response){
          alert(" How Dare You! ");
          window.location.href='/';
        },
        error: function (err){

          console.log(err);
        }
      });
      });
      });
