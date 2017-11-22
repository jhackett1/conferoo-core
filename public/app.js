document.querySelector('section#hero a').addEventListener('click', function(){
  document.querySelector('#cta').scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: 'smooth'
  });
})
