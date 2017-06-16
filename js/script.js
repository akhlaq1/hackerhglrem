(function() {
  var portfolio_resizeable = false;
  var portfolio_resize_timeout, header_parallax_timeout;
  var is_animaitable = true;
  let toastid = 1;
  let timefix;
  let quotesel = document.getElementsByClassName('quoted');
  let maxHeight = [];
  let currentSlide = 0;
  let maxSlider = quotesel.length-1;
  for (let v in quotesel) {
    let height = quotesel[v].offsetHeight;
    if (height) {
      maxHeight.push(height);
      if (v == 0) {
        quotesel[v].classList.add('active');
      } else {
        quotesel[v].classList.add('hide');
      }
    }
  }
  maxHeight = Math.max(...maxHeight);
  let base = document.getElementById('quote-base');
  base.style.height = maxHeight+'px';
  window.onload = function () {
    firebase.initializeApp({
      apiKey: "AIzaSyCuZwQuIqipfOjvAaQwjOl6PD9H_p9Bu2w",
      databaseURL: "https://hackerhgl-d82bd.firebaseio.com"
    });
    firebase.database().ref('portfolio').once('value').then(function(protfolio) {
      var portfolio = protfolio.val();
      var index = 0;
      var length = portfolio.length;
      for(let i=0; i<length; i++) {
        setTimeout(function() {
          var item = portfolio[index];
          var html = '<div class="col-lg-4 col-sm-6 col-10 portfolio-item">';
          html += '<div class="text"><h3>'+item.name+'</h3><p>'+item.technologies.join(" / ")+'</p><a href="'+item.link+'" target="_black">';
          html += '<div class="button"><span>View</span><div class="button-bg"></div></div></a></div>';
          html += '<div class="bg" style="background: url('+item.image+')"></div>';
          html += '</div>';
          document.getElementById("portfolio-base").innerHTML += html;
          var addedItem = document.getElementsByClassName("portfolio-item")[index];
          addedItem.style.height = (addedItem.clientWidth-(addedItem.clientWidth/5))+'px';
          if(index === --length) {
            portfolio_resizeable = true;
          }
          index++;
        },i*400);
      }
    });
  };
  function slider() {
    let el = quotesel[currentSlide].classList;
    if (currentSlide >= maxSlider) {
      currentSlide = 0;
    }
    let elnext = quotesel[currentSlide+1].classList;
    el.remove('active');
    el.add('hide');
    elnext.add('active');
    elnext.remove('hide');
    currentSlide++;
    setTimeout(() => slider(), 8000);
  }
  slider();
  function formErr(element, message) {
    if(message) {
      element.innerHTML = message;
      element.style.display = 'block';
      return;
    } else {
      element.innerHTML = '';
      element.style.display = 'none';
      return;
    }
  }
  function toggleToaster (msg, cls, time = 6000) {
    let toast = document.getElementById('toaster');
    let toastmesssage = document.getElementById('toast-messsage');
    toastmesssage.innerHTML = msg;
    toast.classList.add('active', cls);
    clearTimeout(timefix);
    timefix = setTimeout(() => toast.classList.remove('active', cls), time);
  }
  var validate = {
    name: function(name) {
      name = name.trim().replace(/  +/g, ' ');
      var err = document.getElementById('name_err');
      if(!name || name === '') {
        formErr(err, 'Input your name!');
        return false;
      } else if(name.length > 35) {
        formErr(err, 'Too long name!');
        return false;
      }  else if(name.match(/^[a-z\s]*$/i)) {
        formErr(err, null);
        return name;
      } else {
        formErr(err, 'Invalid Name');
        return false;
      }
    }, email: function(email) {
      email = email.trim();
      var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var err = document.getElementById('email_err');
      if(!email || email === '') {
        formErr(err, 'Input your email');
        return false;
      } else if(email.length < 8 || name.length > 35) {
        formErr(err, 'Invalid email length');
        return false;
      } else if(email.match(email_regex)) {
        formErr(err, null);
        return email;
      } else {
        formErr(err, 'Invalid Email');
        return false;
      }
    }, message: function(message) {
      message = message.trim().replace(/  +/g, ' ');
      var err = document.getElementById('message_err');
      if(!message || message === '') {
        formErr(err, 'Type your message');
        return false;
      } else if(message.length > 1000) {
        formErr(err, 'Message length should be under 100 characters');
        return false;
      } else {
        formErr(err, null);
        return message;
      }
    }
  };
  window.submit = function() {
    let checklimit = Lockr.get("limit");
    let currentDate = new Date()*1;
    if (checklimit > currentDate) {
      toggleToaster('You need to wait for a minute to send message again', 'danger', 15000)
      return false;
    }
    let name = validate['name'](document.getElementById('input_name').value);
    let email = validate['email'](document.getElementById('input_email').value);
    let message = validate['message'](document.getElementById('input_message').value);
    if (name && email && message) {
      let obj = { name, email, message, date: new Date()*1 };
      let key = firebase.database().ref('/messages').push().key;
      firebase.database().ref('/messages/'+key).set(obj, err => {
        let msg, cls;
        if (err) {
          msg = 'Error while sending your message';
          cls = 'danger';
        } else {
          msg = 'Your message is successfully sent';
          cls = 'success';
        }
        toggleToaster(msg, cls);
        let limit = (new Date()*1)+1000*60;
        Lockr.set("limit", limit);
      });
    }
  };
  window.toastclose = function () {
    document.getElementById('toaster').classList.remove('active');
  }
  window.onresize = function() {
    clearTimeout(portfolio_resize_timeout);
    portfolio_resize_timeout = setTimeout(function () {
      if(portfolio_resizeable) {
        var portfolio_items = document.getElementsByClassName('portfolio-item');
        var size = portfolio_items[0].clientWidth;
        size = size - (size/5)
        var length = portfolio_items.length;
        for(i=0; i<length; i++) {
          portfolio_items[i].style.height = size+'px';
        }
      }
    }, 100);
  };
})();
