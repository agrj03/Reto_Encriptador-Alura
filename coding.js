/**Código para inicializar la app 
 * Debe funcionar solo con letras minúsculas
 * No deben ser utilizados letras con acentos ni caracteres especiales
 * Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra 
   encriptada para su versión original.
 * 
 * La letra "e" es convertida para "enter"
 * La letra "i" es convertida para "imes"
 * La letra "a" es convertida para "ai"
 * La letra "o" es convertida para "ober"
 * La letra "u" es convertida para "ufat"
*/
function pruebaRegExp(){
  let cadena = "Esta frase tiene una mayúscula, un acento, coma y punto.";
  let cadena2= "A B C D E ! # $ % & / ( ) = á é í ó ú ö ü";

  let patronNegado = /[^a-z\s\,\.]+/; //No permite mayúsculas y carácteres especiales.

  
  console.log(patronNegado.test(cadena));
  console.log(patronNegado.exec(cadena));
  console.log(patronNegado.test(cadena2));
  console.log(patronNegado.exec(cadena2));

  console.log(patronNegado.exec(frase));
  console.log(patronNegado.exec(frase2));
}

//Cada vez que se ingresa un carácter (encriptador) se comprueba si esta permitido. Sólo minúsculas, no acentos.
function checkInput(){
  let texto = document.getElementById("inCifrado").value;
  /*Bandera Global: retiene el último index de coincidencia, para seguir buscando otras */
  //No permite mayúsculas y carácteres especiales. En la primer coincidencia devuelve true.
  let patronNegado = /[^a-z\s\,\.]+/; 
  let estado = false;
  console.log("Texto: "+ texto);
  console.log(patronNegado.test(texto));
  if(patronNegado.test(texto)=== true ){
    alert(`¡Advertencia, sólo se permiten letras minúsculas.`);
    estado = patronNegado.test(texto);
  }else{
    estado = patronNegado.test(texto);
  }
}
//Aquí encripto el texto recibido 
function encriptacion(){
  let encriptarTexto = document.getElementById("inCifrado").value;

  /*Declaro e inicio el objeto "Vocales". Asigno claves/llaves a las cuales asocio un valor. */
  var objetoVocales = {a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat"};
  /*tes = tes.replace(/a|e|i|o|u/gi, function(matched){return mapObj[matched];});*/

  //Declaro e inicio una expresión regular con las claves (no valores) que contiene mi objeto.
  const re = new RegExp(Object.keys(objetoVocales).join("|"),"gi");
  /*Hago uso de la función reemplazar de RegExp, haciendo uso del objeto para poder cambiar cada una de la vocales 
  sin tener que iterar el código*/
  encriptarTexto = encriptarTexto.replace(re, function(matched){
    return objetoVocales[matched];
  });
  
  console.log(encriptarTexto);

  if(encriptarTexto === ""){
    alert("Campo vacio");
    return;
  }else {
    limpiarTexto();
    ocultarImagen();
    mostrarCaja();
    console.log(encriptarTexto);
    msgEncriptado(encriptarTexto);
    return;
  }
}

function msgEncriptado(cadena){
  document.getElementById('mensajeEncri').value = cadena;
}

//aquí traduzco los mensajes
function desencriptacion(){
  //Tomo el valor del campo de texto
  let desencriptar = document.getElementById('inCifrado').value;
  //Inicio mi objeto para los patrones que deseo buscar
  let aBuscar = {ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u"};
  //Declaro una Regular expression para especificar los patrones que he de interpretar.
  const expReg = RegExp(Object.keys(aBuscar).join('|'),'gi');
  
  if(desencriptar === ""){
    alert("¡Primero debes ingresar un mensaje!");
  }
  else{  
    //Uso la función replace de la expReg, junto a la función emparejados
    desencriptar = desencriptar.replace(expReg, function(matched){
      return aBuscar[matched];
    });
    limpiarTexto();
    ocultarImagen();
    mostrarCaja();
    msgEncriptado(desencriptar);
  }

}

/*Función para el botón copiar. Anticuada
function copyToClipboard(idElemento){
  //Tomo el valor que contiene mi textarea/input
  let val = document.getElementById(idElemento).value;
  //Defino un textarea nuevo para adjuntar
  const selBox = document.createElement('textarea');
  //asigno estilos para que no altere el diseño de la página al ser creado
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val; //le asigno mi valor copiado
  document.body.appendChild(selBox);//lo adjunto al DOM
  selBox.focus();
  selBox.select();
  document.execCommand('copy'); //ejecuto CTRL + C en el campo
  document.body.removeChild(selBox); //lo elimino del DOM
  alert('El texto a sido copiado al portapapeles, usa CTRL + V para pegar.');
}  */

function copiar(identificador){
  let texto = document.getElementById(identificador).value;
  //copia el texto al portapapeles
  navigator.clipboard.writeText(texto);
}

//Interacción con los elementos HTML
function mostrarImagen(){
  document.getElementById('imagen').style.display = 'inline';
}

function ocultarImagen(){
  return document.getElementById('imagen').style.display = 'none';
}

function mostrarCaja(){
  return document.getElementById('ctn_caja').style.display = 'inline';
}

function ocultarCaja(){
  return document.getElementById('ctn_caja').style.display = 'none';
}

function limpiarTexto(){
  return document.querySelector('#inCifrado').value = '';
}