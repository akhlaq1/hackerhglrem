"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}!function(){function e(){var t=l[c].classList;c>=d&&(c=0);var a=l[c+1].classList;t.remove("active"),t.add("hide"),a.add("active"),a.remove("hide"),c++,setTimeout(function(){return e()},8e3)}function t(e,t){return t?(e.innerHTML=t,void(e.style.display="block")):(e.innerHTML="",void(e.style.display="none"))}function a(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:6e3,s=document.getElementById("toaster");document.getElementById("toast-messsage").innerHTML=e,s.classList.add("active",t),clearTimeout(n),n=setTimeout(function(){return s.classList.remove("active",t)},a)}var s,o=!1,n=void 0,l=document.getElementsByClassName("quoted"),r=[],c=0,d=l.length-1,m={hello:!1,want:!1,best:!1,contact:!1},u=void 0;for(var h in l){var g=l[h].offsetHeight;g&&(r.push(g),0==h?l[h].classList.add("active"):l[h].classList.add("hide"))}r=Math.max.apply(Math,_toConsumableArray(r)),document.getElementById("quote-base").style.height=r+"px",window.onload=function(){firebase.initializeApp({apiKey:"AIzaSyCuZwQuIqipfOjvAaQwjOl6PD9H_p9Bu2w",databaseURL:"https://hackerhgl-d82bd.firebaseio.com"}),firebase.database().ref("portfolio").once("value").then(function(e){var t=e.val();t.push({name:"Hackerhgl",link:"https://hackerhgl.github.io",technologies:["UI","UX","Bootstrap","Scroll Reveall","Animations","Parallax"],image:"https://firebasestorage.googleapis.com/v0/b/hackerhgl-d82bd.appspot.com/o/web%20data%2Fhackerhgl.jpg?alt=media&token=7375e671-d9cd-4f9a-b892-3b8934434eef"});for(var a=0,s=t.length,n=0;n<s;n++)setTimeout(function(){var e=t[a],n='<div class="col-lg-4 col-sm-6 col-10 portfolio-item">';n+='<div class="text"><h3>'+e.name+"</h3><p>"+e.technologies.join(" / ")+'</p><a href="'+e.link+'" target="_black">',n+='<div class="button"><span>View</span><div class="button-bg"></div></div></a></div>',n+='<div class="bg" style="background: url('+e.image+')"></div>',n+="</div>",document.getElementById("portfolio-base").innerHTML+=n;var l=document.getElementsByClassName("portfolio-item")[a];l.style.height=l.clientWidth-l.clientWidth/5+"px",a===--s&&(o=!0),a++},400*n)})},e(),function(){var e=document.getElementById("character-base"),t=document.getElementById("character-desc");window.addEventListener("scroll",function(){var a=this;clearTimeout(u),u=setTimeout(function(){var s={hello:window.innerHeight-180};s.want=s.hello+document.getElementById("about").offsetHeight-100,s.best=s.want+document.getElementById("status").offsetHeight+document.getElementById("quotes").offsetHeight-140,s.contact=s.best+document.getElementById("portfolio").offsetHeight+700,a.scrollY>s.hello&&!m.hello?(m.hello=!0,t.innerHTML="Hello how are you ?",e.classList.add("hello"),t.classList.add("hello")):a.scrollY<s.hello&&m.hello&&(m.hello=!1,e.classList.remove("hello"),t.classList.remove("hello")),a.scrollY>s.want&&!m.want&&(m.want=!0,t.innerHTML="Are you looking for developer?",e.classList.add("want"),t.classList.add("want"),e.classList.remove("hello"),t.classList.remove("hello")),a.scrollY<s.want&&m.want&&(m.want=!1,t.innerHTML="Hello how are you ?",e.classList.remove("want"),t.classList.remove("want"),e.classList.add("hello"),t.classList.add("hello")),a.scrollY>s.best&&!m.best?(m.best=!0,t.innerHTML="Just look how good this guy is!!",e.classList.add("best"),t.classList.add("best"),e.classList.remove("want"),t.classList.remove("want")):a.scrollY<s.best&&m.best&&(m.best=!1,t.innerHTML="Are you looking for developer?",e.classList.remove("best"),t.classList.remove("best"),e.classList.add("want"),t.classList.add("want")),a.scrollY>s.contact&&!m.contact&&(m.contact=!0,t.innerHTML="Go contact him :P"),a.scrollY<s.contact&&m.contact&&(m.contact=!1,t.innerHTML="Just look how good this guy is!!"),a.scrollY<s.hello&&(e.classList.remove("hello"),t.classList.remove("hello"),e.classList.remove("best"),t.classList.remove("best"),e.classList.remove("want"),t.classList.remove("want"))},100)})}();var v={name:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){e=e.trim().replace(/  +/g," ");var a=document.getElementById("name_err");return e&&""!==e?e.length>35?(t(a,"Too long name!"),!1):e.match(/^[a-z\s]*$/i)?(t(a,null),e):(t(a,"Invalid Name"),!1):(t(a,"Input your name!"),!1)}),email:function(e){e=e.trim();var a=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,s=document.getElementById("email_err");return e&&""!==e?e.length<8||name.length>35?(t(s,"Invalid email length"),!1):e.match(a)?(t(s,null),e):(t(s,"Invalid Email"),!1):(t(s,"Input your email"),!1)},message:function(e){e=e.trim().replace(/  +/g," ");var a=document.getElementById("message_err");return e&&""!==e?e.length>1e3?(t(a,"Message length should be under 100 characters"),!1):(t(a,null),e):(t(a,"Type your message"),!1)}};window.submit=function(){if(Lockr.get("limit")>1*new Date)return a("You need to wait for a minute to send message again","danger",15e3),!1;var e=v.name(document.getElementById("input_name").value),t=v.email(document.getElementById("input_email").value),s=v.message(document.getElementById("input_message").value);if(e&&t&&s){var o={name:e,email:t,message:s,date:1*new Date},n=firebase.database().ref("/messages").push().key;firebase.database().ref("/messages/"+n).set(o,function(e){var t=void 0,s=void 0;e?(t="Error while sending your message",s="danger"):(t="Your message is successfully sent",s="success"),a(t,s);var o=1*new Date+6e4;Lockr.set("limit",o)})}},window.toastclose=function(){document.getElementById("toaster").classList.remove("active")},window.onresize=function(){clearTimeout(s),s=setTimeout(function(){if(o){var e=document.getElementsByClassName("portfolio-item"),t=e[0].clientWidth;t-=t/5;var a=e.length;for(i=0;i<a;i++)e[i].style.height=t+"px"}},100)}}();