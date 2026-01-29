let form = document.getElementById("myform");
let message = document.getElementById("message");
let tablebody = document.getElementById("tablebody");
let tfoot = document.getElementById("tfoot")

const demandes = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let prenome = document.getElementById("prenome").value;
    let telephone = document.getElementById("telephon").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let motif = document.getElementById("motif").value;

    let inputs = document.querySelectorAll("input");
    let txter = document.querySelector("textarea");
    let array = Array.from(inputs);
    array.push(txter);

    if (
        nome === "" ||
        prenome === "" ||
        telephone === "" ||
        email === "" ||
        date === "" ||
        motif === ""
    ) {
        message.innerText = "Vous de devez remplir toutes les champs";
        message.style.color = "red";
        message.style.fontWeight = "bold";
        message.style.textAlign = "center";
        controlMessage();
        // hada dyal lon dyal input llhawya

        for (let i = 0; i < array.length; i++) {
            if (array[i].value === "") {
                array[i].classList.add("roug");
            } else {
                array[i].classList.remove("roug");
            }
        }
        return;
    }

    let demande = {
        nome: nome,
        prenome: prenome,
        telephone: telephone,
        email: email,
        date: date,
        motif: motif,
    };

    demandes.push(demande);

    romplirTableax();

    message.innerText = "ajouter avec succée";
    message.style.color = "green";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";
    controlMessage();

    tfoot.querySelector("td").innerText ="Totale de demandes : " + demandes.length;


    form.reset();
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("roug");
    }

});

function romplirTableax() {
    tablebody.innerHTML = ``;

    demandes.forEach((obj, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
 <td>${obj.nome}</td>
 <td>${obj.prenome}</td>
 <td>${obj.telephone}</td>
 <td>${obj.email}</td>
 <td>${obj.date}</td>
 <td>${obj.motif}</td>
 <td><button class="suprim" onclick="funcDelet(${index})" >🗑️supprimer</button></td>
 `;
        tablebody.appendChild(tr);
    });
}

function funcDelet(index) {
    demandes.splice(index, 1);
    romplirTableax();
    tfoot.querySelector("td").innerText = "Totale de demandes : " + demandes.length;

}

function controlMessage() {
    message.classList.add("show-msg");

    setTimeout(() => {
        message.classList.remove("show-msg");
    }, 3000);
}

let search = document.getElementById("recherch");

search.addEventListener("input", function () {
    let value = search.value.toLowerCase();
    let rows = tablebody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].innerText.toLowerCase();

        if (row.includes(value)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
});
