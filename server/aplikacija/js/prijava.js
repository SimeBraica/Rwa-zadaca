window.addEventListener('load', function () {
    const submitButton = document.getElementById('submitBtn');
    submitButton.addEventListener('click', sendData);
    localStorage.removeItem("korime");
});



async function sendData() {
    const korime = document.getElementById('korime').value;
    const lozinka = document.getElementById('lozinka').value;
    const formData = {
        korime: korime,
        lozinka: lozinka,
    };

    console.log(formData);

    const response = await fetch('/prijava', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });


    if (response.status === 200) {
        const result = await response.json();
        localStorage.setItem('korime', korime);
        window.location.href = "/";
    } else if(response.status === 401) {
        let poruka = document.getElementById("poruka");
        const result = await response.json();
        poruka.innerHTML = result.greska;
        console.error('Error:', response.statusText);
    }
}