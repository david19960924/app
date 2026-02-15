htmlCargado();

function htmlCargado(){
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Token:", data.token);

            // Guardar token
            localStorage.setItem("jwt", data.token);
            window.location.href = "/";
            //alert("Login exitoso");
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
}

/*
function bienvenido(){
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:8080/home", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("No autorizado");
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

}
*/