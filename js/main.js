var current_color = 'black';

function set_Wall(elem) {
  if(elem.style.backgroundColor == 'black'){
    elem.style.backgroundColor = 'white';
  }
  else{
    elem.style.backgroundColor = 'black';
  }
}

function set_Color(elem){
  elem.style.backgroundColor = current_color;
}

function updateC(c1) {
  current_color = c1.value;
}
