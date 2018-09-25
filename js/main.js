var current_color = 'black';
var old_crd = 0;


function set_Wall(elem) {
	var curr_crd = elem.getBoundingClientRect().top + window.scrollY + elem.getBoundingClientRect().right;
	
	$(elem).mousemove(function(e){
		
		if(e.which == 1 && old_crd != curr_crd){
			
			old_crd = curr_crd;

			if(elem.style.backgroundColor == 'black'){
				
				elem.style.backgroundColor = 'white';
				
			}
			else{
				
				elem.style.backgroundColor = 'black';	
				
			}
		}
	});
 }

function set_Color(elem){
  elem.style.backgroundColor = current_color;
}

function updateC(c1) {
  current_color = c1.value;
}


function myAlert() {
	alert("Oops! Looks like we don't have any algorithms yet!");
}