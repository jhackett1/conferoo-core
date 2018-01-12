document.querySelector('section#hero a').addEventListener('click', function(e){
  e.preventDefault();
  document.querySelector('#about').scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: 'smooth'
  });
});
