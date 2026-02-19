htmlCargado();



function htmlCargado() {
    const API_URL = window.location.origin;

    document.getElementById("loginForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error("Error en el registro");
            }

            const data = await response.json();
            alert("Usuario registrado correctamente");

        } catch (error) {
            console.error(error);
            alert("Error al registrar usuario");
        }
    });
}
