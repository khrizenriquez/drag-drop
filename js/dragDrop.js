/* 
    ****************************
    *   @author khrizenriquez  *
    *   @name   Drag&Drop      *
    ****************************

    funciones para las pruebas de drag & drop

    Muchas cosas de este código fue gracias al señor Jesús Conde 
    ( https://www.youtube.com/watch?v=qRDiwUMOj8w&list=PLEB8E488D1C2D4C9F ) 
    donde se tomo muchos ejemplos de su código para hacer el drag and drop posible

    Por el momento funciona en los navegadores Chrome, Zafari, Mozilla Firefox
*/

/*
    funcion para agregar los elementos al div donde será arrastrable,
    se estarán agrengado los atributos:
        -draggable: tiene un valor de true para hacerlo arrastrable, si no lo queremos así, 
                    podemos cambiarlo a false
        -ondragstart: disparará el evento de cuando se inicie a arrastrar un elemento
        -ondragend: disparará un evento cuando se deje de arrastrar el elemento
    para manipular los elementos y que se puedan arrastrar
*/
function agregandoElementos ( valor ) {
    if  (valor.value.length > 2){
        var timestamp = Math.floor(+new Date()/1000);
        //si lo que viene en el texto es mayor a una longitud de 2 agrego los valores
        $( "#divElementos" ).append("<div class='divAgregando' id='id-" + timestamp + "' " + 
                                    "draggable='true' "+
                                    "ondragstart='return empezar(event);' " +
                                    "ondragend='return end(event);'> "+ valor.value +" </div>");
        //seteo a algo vacio el input de nuevo
        valor.value = "";
    }
}

/*
    funcion que se activara cuando se inicie el evento de arrastrar
*/
function empezar ( e ) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData( "Data", e.target.getAttribute("id") );
    e.dataTransfer.setDragImage( e.target, 0, 0 );
    return true;
}

/*
    funcion que que se activa cuando entramos al contenedor donde se pueden soltar los elementos
*/
function enter ( e ) {
    return true;
}

/*
    
*/
function over ( e ) {
    //var arrastrable = e.dataTransfer.getData( "Data" );
    var id = e.target.getAttribute( "id" );
    e.dataTransfer.dropEffect = "move";
    if ( id == "divElementos" ||
       id == "divMeGustan" ||
       id == "divNoMeGustan")
        return false;//retorno false para que se deje soltar
    else
        return true;//con true no se deja soltar
}

/*
    funcion que que se activa cuando soltamos el elemento ( drop )
*/
function drop ( e ) {
    var arrastrando = e.dataTransfer.getData("Data");
    e.target.appendChild( document.getElementById( arrastrando ) );
    e.stopPropagation();
    return false;
}

/*
    funcion que que se activa cuando finaliza el arrastrado, limpio el valor que tenga dataTransfer
    con el clearData
*/
function end ( e ) {
    e.dataTransfer.clearData( "Data" );
    return true;
}