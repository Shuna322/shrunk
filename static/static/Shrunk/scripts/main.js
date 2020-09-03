window.addEventListener( "load", function () {
  function sendData() {
    const XHR = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      // alert( event.target.responseText );
      $(".res").addClass("created")
      $(".res").removeClass("error")
      $(".res").hide()
      $(".res").empty()
      var short_url = "https://"+ window.location.hostname +"/" + JSON.parse(event.target.responseText).slug

      $(".res").append("\
<div class=\"title\">Your URL</div>\
<div class=\"message shortUrl\">" + short_url + "</div>").slideDown(750)

      $(".res").addClass("copy")


      const short_url_box = document.getElementById("short_url_box")

      var tooltip = document.getElementById("tooltip");

      short_url_box.addEventListener( "click", function ( event ) {
        event.preventDefault();

        copyText_elem = document.getElementsByClassName("shortUrl").item(0)

        copyToClipboard(copyText_elem)

        var tooltipText = document.getElementsByClassName("tooltip-text").item(0);
        tooltipText.textContent = "Copied !";


        tooltip.setAttribute("data-tooltip-text", "Copied !");
      } );


      short_url_box.addEventListener( "mouseover", function ( event ) {
        // Create tooltip element
        var tooltipText = document.createElement('div');
        
        // Set tooltip text
        tooltipText.textContent = tooltip.getAttribute('data-tooltip-text');
        tooltipText.classList.add('tooltip-text');

        document.body.appendChild(tooltipText);
      } );



      short_url_box.addEventListener( "mouseout", function ( event ) {
        var tooltipText = document.getElementsByClassName("tooltip-text").item(0);
        tooltipText.remove();
      } );

      short_url_box.addEventListener('mousemove', function(e) {
        var tooltipText = document.getElementsByClassName("tooltip-text").item(0);
        tooltipText.style.top = (e.pageY + 20) + 'px';
        tooltipText.style.left = (e.pageX + 20) + 'px';
      }, false);

      

    })

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      $(".res").addClass("error")
      $(".res").removeClass("created")
      $(".res").hide()
      $(".res").empty()
      $(".res").append("<div class=\"title\">Unknown error occurred</div>").slideDown(750)
    } );


    // Set up our request
    XHR.open( "POST", "/api/get_link/");
    XHR.setRequestHeader('X-CSRFToken', csrftoken);
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");



    if (url.value.slice(0, 4) != "http") {
      var source_url = "http://" + url.value;  
    } else {
      var source_url = url.value;
    }

    var body = JSON.stringify({
      "url": source_url
    } )

    // // The data sent is what the user provided in the form
    XHR.send( body );
  }
 

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }


  const url = document.getElementById( "url" );
  const btn = document.getElementById( "create" );
  const csrftoken = getCookie('csrftoken');


  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_@.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_@.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  // ...and take over its submit event.
  btn.addEventListener( "click", function ( event ) {
    event.preventDefault();
    if (validURL(url.value)) {
      sendData();
    } 
    else {
      $(".res").addClass("error")
      $(".res").removeClass("created")
      $(".res").hide()
      $(".res").empty()
      $(".res").append("<div class=\"title\">Your URL is invalid</div>").slideDown(750)
    }
  } );


  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    tsParticles
      .loadJSON("tsparticles", "/static/Shrunk/particles_mobile.json")
      .then((container) => {})
      .catch((error) => {
        console.log("Please report this error at: o.pokydko@gmail.com")
        console.error(error);
      });
  } else {
    tsParticles
      .loadJSON("tsparticles", "/static/Shrunk/particles.json")
      .then((container) => {})
      .catch((error) => {
        console.log("Please report this error at: o.pokydko@gmail.com")
        console.error(error);
      });
  }


  function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    target.remove()
    return succeed;
  }    
} );