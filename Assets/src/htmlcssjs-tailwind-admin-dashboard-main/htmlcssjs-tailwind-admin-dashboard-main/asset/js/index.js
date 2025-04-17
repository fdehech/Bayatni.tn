$(document).ready(function () {
  $("#datatable").DataTable();
  //sidebar-link collapse
  $(".sidebar_item").click(function () {
    $(".sidebar_link_item")
      .not($(this).next(".sidebar_link_item"))
      .slideUp(300);

    $(this).next(".sidebar_link_item").slideToggle(300);
    $(this).toggleClass("active");
  });

  $(".toggler").on("click", function () {
    $("#aside").toggleClass("toggled");
    $(".contant").toggleClass("expend");
    $("#toggler").toggleClass("fa-regular fa-solid");

    $("#aside").hover(
      function () {
        $(".sidebar_wrapper").toggleClass("hide_title");
        $(".toggler").toggleClass("hidden");
        $(".full-logo").toggleClass("hidden");
        $(".small-logo").toggleClass("hidden");
      },
      function () {
        $(".sidebar_wrapper").toggleClass("hide_title");
        $(".toggler").toggleClass("hidden");
        $(".full-logo").toggleClass("hidden");
        $(".small-logo").toggleClass("hidden");
        $(".sidebar_item").remove("active");
        $(".sidebar_link_item").slideUp(200);
      }
    );
  });

  //screen size change

  var initialWidth = $(window).width();
  windowSize(initialWidth);
  $(window).resize(function () {
    var changeWidth = $(window).width();
    windowSize(changeWidth);
  });
  function windowSize(width) {
    if (width < 760) {
      $(".contant").addClass("toggled-sidebar");
    } else {
      $(".contant").removeClass("toggled-sidebar");
    }
  }

  // theme
  $("#theme-toggler").on("click", function () {
    $(this).toggleClass("fa-sun fa-moon");
  });

  $("ul.tabs li").on("click", function () {
    // get the data attribute
    var tab_id = $(this).attr("data-tab");
    // remove the default classes
    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");
    // add new classes on mouse click
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  //password show-hide

  var showHideButton = $(".see-hide-password");
  $(showHideButton).on("click", function () {
    var inputType = $(this).prev("input");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (inputType.attr("type") == "password") {
      inputType.attr("type", "text");
    } else {
      inputType.attr("type", "password");
    }
  });

  // password and confirm password

  $("#confirm_password").on("keyup", function () {
    var password = $("#password").val();
    var confirmPassword = $(this).val();
    if (password !== confirmPassword) {
      $(this).css({
        border: "1px solid red",
      });
      $("#confirm_password_error").removeClass("hidden");
    } else {
      $(this).css({
        border: "1px solid var(--primary-color)",
      });
      $("#confirm_password_error").addClass("hidden");
    }
  });

  //dropdown
  $(".dropdown").on("click", function () {
    $(this).children(".dropdown-wrapper").slideToggle(200);
    $(".dropdown").not($(this)).children(".dropdown-wrapper").slideUp(200);
  });
});
