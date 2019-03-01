
  var totalPath = "";
 var indexSVG='';
 var isframe = '';
var no_constraints, no_robot, no_state, no_species;

document.addEventListener("deviceready", onDeviceReady, false);


            function onDeviceReady() {
                    console.log("device success=======================");
                       
                    searchmatrix();
                    dbCheck();
                     var db = window.sqlitePlugin.openDatabase({name: dbName});
                     db.transaction(staticsvg, errorinc);
                     db.transaction(objetAsc, errorinc);

                }

                function dbCheck(){
                   
                    //alert(localStorage.getItem("uninstalled"));
                    if (localStorage.getItem("uninstalled") == null) {

                        //dbremove();
                        dbcopy();
                      localStorage.setItem("uninstalled", true);
                      //alert(localStorage.getItem("uninstalled"));
                    }
                    else {

                    }
                }
                function dbremove(){
                    window.plugins.sqlDB.remove(dbName,rmsuccess, dbcopy);
                }

                function dbcopy()
                {
                       //alert('ccc');
                    window.plugins.sqlDB.copy(dbName,copysuccess,errorinc);
                }

                function rmsuccess(){

                }

                function copysuccess(){
                 alert('copysuccess')

                }
            
                 function success(){
                    var appstr = "";
                    var i;  
                    var appellable = [];                    
                    for( i =0; i < Object.keys(object_asc).length; i++) {

                        var desc_num = object_asc[i]["Desc_Num"];
                        appellable[desc_num] = object_asc[i]["Joker"];
                    }
                    for ( i =0; i < appellable.length; i++){

                    appstr += appellable[i];

                    }
                    var localappstr = { "txtappstr": appstr,"contracode":"" ,"linkresult": "" ,"linkspecies": ""}
                    localStorage.setItem('appstrvalue',JSON.stringify(localappstr));

                    var replacevalues = { "txtstore": "0", "txtappstr": appstr , "txtcharname": "", "txtquest":"", "txtcurquest": ""}
                    localStorage.setItem('formvalues', JSON.stringify(replacevalues));


                }
                function staticsvg(tx){
                    //alert('cm')
                  tx.executeSql("select * from but_deter", [], buttonNames, errorinc);
                  tx.executeSql('select * from contradictions', [], contradictionsFull, errorinc);
                  tx.executeSql('select * from parametres', [], nbConst, errorinc);
                  tx.executeSql("select count(*) as recordcount from flore", [], floreCount, errorinc);
                  tx.executeSql('select * from hierarchie where C_0 = "Fin"', [], show, errorinc);
                  tx.executeSql('select distinct(Famille) from flore order by Famille', [], familleFunction, errorinc);
                  
                  

                }
                function nbConst(tx,nbConstant){
                    for(var i=0;i<nbConstant.rows.length;i++){
                        if(nbConstant.rows.item(i).Type_Param == 'Nb_Contraintes'){
                            no_constraints = nbConstant.rows.item(i).Etat
                            //alert(no_constraints);
                        }
                        if(nbConstant.rows.item(i).Type_Param == 'Nb_Robot'){
                            no_robot= nbConstant.rows.item(i).Etat;
                            //alert(no_robot)
                        }
                        if(nbConstant.rows.item(i).Type_Param == 'Nb_Etats_Desc'){
                            no_state = nbConstant.rows.item(i).Etat
                            //alert(no_state);
                        }
                    }
                
                }
                function floreCount(tx,floreConst){

                    no_species = floreConst.rows.item(0).recordcount;
                    var percent = { "count": no_species , "val": "0" }; 
                localStorage.setItem('percentage', JSON.stringify(percent));
                $(".per_cou").html(no_species);
                
                updateProcess(number,0);
                $(".end").html("<p>" + number + " espèces à </p>");
                
                }
                function contradictionsFull(tx,contraFull){

                    for(var i=0;i<contraFull.rows.length;i++){
                        contradiction_full.push(contraFull.rows.item(i));
                     }
                
                }
                
            function show(tx,results){
                //alert(JSON.stringify(results.rows.item));
                                  console.log(results);

                var path;
                var count = 0;
                for(var i=0; i< results.rows.length; i++)
                    {       
                        count++;
                    var robot_num = addLeadingZero(results.rows.item(i).Robot_Num);
                    if (robot_num.length == 1){

                                    robot_num = addLeadingZero(results.rows.item(i).Robot_Num);
                                }
                        path =  "robot" + "/" + robot_num + "/" + results.rows.item(i).Nom;

                        if (totalPath.length > 0 ) {
                                  totalPath += "|" +path;
                                }
                                else {
                                  totalPath += path;
                                }
                        if(count == results.rows.length){
                            getsvgData();
                        }
                    }
            }

            function getsvgData(){
                //alert(totalPath)
                var myarr = totalPath.split("|");
                 var j=0;
                 var path;
                for(var i = 0; i < myarr.length; i++){
                  (function(i) {
                  path = myarr[i];
                   $.get(path, function(data) { 
                          j++;
                           indexSVG+=data;
                           //alert(j);
                           //alert(myarr.length);
                            if(j == myarr.length){
                                svgData(indexSVG);
                            }
                    },dataType="text")
                   .fail(function() {
                         j++;
                         });
                 }(i));
                }
            }
            function svgData(temp){

                    console.log(temp);
                    //alert(temp);
                    var h;
        var style_h = '';
                var a = window.innerHeight;

        
            if(a>700){
                h= a-60;
                style_h = 'style="height:'+h+'px;width:100%;"';
                      }else {
                 h = a;
                style_h = 'style="height:'+h+'px;width:100%;"';

              }


       isframe = '<svg  id="homesvg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"  '+style_h+' image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 2836 2126" xmlns:xlink="http://www.w3.org/1999/xlink">';                isframe+=temp;
              isframe+=temp;
              isframe+='</svg>'; 
              $('.message').html(isframe).show();
              //alert($('.message').html());
                }

                 function objetAsc(tx){
                    //alert('cm')
                  tx.executeSql('SELECT * FROM objets_fic ORDER BY Objet ASC', [], objetTable, errorinc);
                  tx.executeSql('select * from caracteres', [], caractVar, errorinc);
                  tx.executeSql('select * from descendance', [], descendance, errorinc);
                  tx.executeSql('select * from flore', [], floreTab, errorinc);
                  tx.executeSql('select distinct(Nom) from communs_english order by Nom', [], commonName, errorinc);


                }
            function objetTable(tx,objetres){
                for(var i=0;i<objetres.rows.length;i++){
                    object_asc.push(objetres.rows.item(i));
                    object_full.push(objetres.rows.item(i));
                }
            }
            function commonName(tx,cNames){
                for(var i=0;i<cNames.rows.length;i++){
                    
                    communs_english.push(cNames.rows.item(i));
                }
            }
            function buttonNames(tx,buttonText){
                var text = '';
                for(var i=0;i<buttonText.rows.length;i++){
                   text+='<a href="#" class="ui-btn nav_btn '+buttonText.rows.item(i).Key+'" onclick="showquest('+"'"+buttonText.rows.item(i).Key+"'"+')" >'+buttonText.rows.item(i).Caption+'</a>'
                    if(i== (buttonText.rows.length-1)){
                    $(".sideButtons").html(text);
                    }
                }
            }
             function caractVar(tx,carRes){
                //alert(carRes.rows.length);
                var carac;
                for(var i=0;i<carRes.rows.length;i++){
                caract_full.push(carRes.rows.item(i));;

                     carac =  carRes.rows.item(i).ID_CARAC;  
                    char_val[carac] = carRes.rows.item(i).NUM;
                    if(i== (carRes.rows.length-1)){
                        for(var j in char_val)
                            char_val_arr.push(j);
                    }
                }
             }

             function descendance(tx,descendanceRes){
                                    success();

                                //alert("desc"+descendanceRes.rows.length);

                for(var i=0;i<descendanceRes.rows.length;i++){
                    descendance_full.push(descendanceRes.rows.item(i));
                }
            }
            function floreTab(tx,floreRes){
                      //alert("flore"+floreRes.rows.length);

                for(var i=0;i<floreRes.rows.length;i++){
                    flore_full.push(floreRes.rows.item(i));
                    flore_asc.push(floreRes.rows.item(i));
                    perarray[floreRes.rows.item(i).Code] = 0;
                }
            }
          function familleFunction(tx,familleRes){
                      //alert("flore"+floreRes.rows.length);
                  for(var i=0;i<familleRes.rows.length;i++){

                    flore_order_by_famille.push(familleRes.rows.item(i));
                  }
                    
            }



            function errorinc(e)
                {
                     console.log("ERROR at include file: " + e.message);
                    }
            
        
 
    