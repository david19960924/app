inicio();

function inicio(){

     const token = localStorage.getItem("jwt");

     //llama al backent
     if (!token) {
          window.location.href = "/formLogin";
     }

     // Decodificar el payload
     const payload = JSON.parse(atob(token.split('.')[1]));

     const exp = payload.exp; // tiempo en segundos
     const ahora = Math.floor(Date.now() / 1000); // tiempo actual en segundos

     if (exp < ahora) {
         console.log("Token expirado");

         localStorage.removeItem("jwt");
         window.location.href = "/formLogin";
         return;
     }

     console.log("Token válido:", token);
}



