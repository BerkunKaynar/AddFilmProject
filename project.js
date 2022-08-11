const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


//UI Objesini Başlatma
const ui = new UI();

// Storage Objesi
const storage = new Storage();

//Tüm Eventleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //Hata
     ui.displsayMessages("Lütfen Tüm Alanları Doldurun!","danger");
      
    }
    else{
        //Yeni Film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // Ara yüze film ekleme
        storage.addFilmToStorage(newFilm); // Storage'a film ekleme
        ui.displsayMessages("Film Başarıyla Eklendi","success");
    }

    ui.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target)
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displsayMessages("Silme İşlemi Gerçekleşti...","success");
    }
}

function clearAllFilms(){
    if(confirm("Tüm Filmleri Silmek İstediğinizden Emin Misiniz?")){
        ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
    }
    
}