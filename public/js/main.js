$(document).ready(function() {
  $(".delete-song").on("click", function(e) {
    $target = $(e.target)
    const id = $target.attr("data-id")

    $.ajax({
      type: "DELETE",
      url: "/songs/" + id,
      success: function(response) {
        alert(" How Dare You! ")
        window.location.href = "/"
      },
      error: function(err) {
        console.log(err)
      }
    })
  })
})

function move() {
  window.location.href = "/songs/add"
}
function navigateToLogin() {
  window.location.href = "/users/login"
}
function navigateToRegister() {
  window.location.href = "/users/register"
}
function listenNow(name, artist) {
  window.location.href =
    "https://www.google.com/search?q=" + artist + "+" + name
}
