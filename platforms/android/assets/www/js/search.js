



var state       = no_state;
var constraints	= no_constraints
var robot		= no_robot
var species		= no_species

var frmvalues = localStorage.getItem('formvalues'); 
var fnlvalue = JSON.parse(frmvalues);
var store = fnlvalue.txtstore;
var appstr = fnlvalue.txtappstr;

var s = new Array();

var etat = new Array();

var usrstore = new Array();

var	max = 1;
var compteur = 0;

var questname;
var qname;
var cname;

var flag = 0;

var listvalues1 = localStorage.getItem('percentage'); 
var finalvalue1 = JSON.parse(listvalues1);
var number1 = finalvalue1.count;
var value1 = finalvalue1.val;

if(number1==1){
	$('.nextbutton').hide();
	$(".SearchWrapper").html("<p class='warning' >Il n'y a plus qu'une espèce !</p>");

	flag = 1;
}

if (store.length == 1){
		for (var i=0; i < state; i++){
			store += "0";
		}
}

for (var i=0; i<state; i++){
	usrstore[i] = store.substr( i, 1);
}

var appellable = new Array();

for (var i = 0; i < appstr.length; i++){
	appellable[i] = appstr.substr( i, 1);
}

 if(typeof matrice === 'undefined' || Object.keys(matrice).length == 0 ){
				var matrice = new Array();
                  var caracter;
                  nombre = Object.keys(flore_full).length;
                    for (var i = 0; i < nombre; i++)
                      {
                      	for(var j = 0; j < Object.keys(caract_full).length; j++){
                      	
                      		caracter = caract_full[j]["ID_CARAC"];  
                      		if(j==0){
                      			matrice[i]=[];
                      		}
                      		matrice[i][j]=0;
                      		matrice[i][j] = flore_full[i][caracter];
                      	}
                        
                      }
                      
}           

 searchquest();            
                

                 function searchquest(){
                 	var tempvar;
                 	var provenance;
                 	var index_car;
                 	var nb_car;
                 	var etats = [];
                 	//var dno;
                 	for (var ij =0; ij < Object.keys(object_asc).length; ij++)
					{
						if (appellable[object_asc[ij]["Desc_Num"]] == 1)
						{
							provenance  = -1;
							index_car= object_asc[ij]["Index_Car"];
							nb_car = object_asc[ij]["Nb_Car"];
							for (var i = index_car; i <= parseInt(index_car) + parseInt(nb_car) -1 ; i++){
								if (usrstore[i] != "0"){
									provenance = i - parseInt(object_asc[ij]["Index_Car"]);
								}
							}

						}
						else
						{
							provenance = 1;	
							s[compteur] = 0;
						}
						if (provenance == -1)
							{
							
								for (var j = 0; j <=  nb_car - 1; j++){
									etats[j] = 0;
								}
										 
								for (var i = 0; i <= nombre - 1 ; i++)
								{
									for (var k = 0; k <= nb_car - 1; k++)
									{	

										tempvar = parseInt(k) + parseInt(index_car);
										etats[k] = parseInt(etats[k])  + parseInt(matrice[i][tempvar]);
									}
									
								}

								s[compteur] = 0;
								for (var i = 0; i <= nb_car - 1 ; i++)
								{
									if (etats[i] != "0")
									{
										s[compteur] = s[compteur] - etats[i] / nombre * Math.log(nombre / etats[i]) / Math.log(nb_car);
									}	
								}		
								s[compteur] = Math.abs(s[compteur]);
					 		}
							else{
								s[compteur] = 0;
							}
							compteur = compteur + 1;
						}

						// sort the array and get the maximum
						max = 0;
						var numero;
						for (var i = 0; i <= compteur - 1; i++)
						{
							if (max < s[i])
							{
								max = s[i];		   
								numero = i;
							}
						}

						if (max != "0")
						{		
							var temp = "";
							questname = "quest/" + object_asc[numero]["Popup"];	
							qname = object_asc[numero]["Desc_Num"];
							cname = object_asc[numero]["Objet"];
							if(flag==0){
								temp = '<object id="svgquest" type="image/svg+xml" data="'+questname+'" width="100%" height="100%" ><param name="src" value="'+questname+'" ></object>';
								$(".SearchWrapper").html(temp);
								
							}
						}
						else
						{
							
						}	

                    	fnlvalue.txtstore = store;
                    	fnlvalue.txtcurquest = qname;
                    	fnlvalue.txtquest = cname;
                    	localStorage.setItem('formvalues', JSON.stringify(fnlvalue));
					}
                 

