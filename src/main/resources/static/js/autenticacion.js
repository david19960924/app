htmlCargado();



function htmlCargado(){
    const API_URL = window.location.origin;
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {

              if (response.status === 401) {
                  throw new Error("Credenciales incorrectas");
              }

              if (response.status === 403) {
                  throw new Error("Usuario bloqueado temporalmente");
              }

              return response.json();
        })
        .then(data => {
              console.log("Token:", data.token);

              // Guardar token
              localStorage.setItem("jwt", data.token);
              window.location.href = `${API_URL}/`;
        })
        .catch(error => {
              alert(error.message);
              console.log(error.message);
        });

    });
}

