
$(document).ready(function() {

  $('.delete-song').on('click' , function(e) {
    $target = $(e.target)
    const id = $target.attr('data-id');

      $.ajax({
        type:'DELETE',
        url:'/song/'+id,
        success: function(response){
          alert("8-| How Dare You! |-8");
          window.location.href='/';
        },
        error: function (err){

          console.log(err);
        }
      });
      });
      });
