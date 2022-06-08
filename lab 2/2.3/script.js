"use strict";
let btn = document.getElementById("btn");
let show_data = document.getElementById("display");
let myform = document.forms["covid_data"];
let web_storage = document.getElementById("ws");
btn.addEventListener("click", start_action);

let countries = [];
let vaccinations = new Map();
let cases = new Map();
let deaths = new Map();

function start_action () {
    show_data.innerHTML = "";

    if (web_storage.checked) {
        countries = JSON.parse(localStorage.getItem("countries"));
        vaccinations = new Map(JSON.parse(localStorage.getItem("vaccinations")));
        cases = new Map(JSON.parse(localStorage.getItem("cases")));
        deaths = new Map(JSON.parse(localStorage.getItem("deaths")));
    }

    let commands = myform.elements["new_data"].value.split(";");
    for (let i=0; i<commands.length; i++) {
        let current_com = commands[i].split(" ");
        current_com = current_com.filter(c => c != "");
        if (current_com.length < 1) {
            window.alert("niepoprawna składnia!");
        } else {
            switch(current_com[0]) {
                case "dodaj":
                    add_country(current_com[1]);
                    break;
    
                case "usuń":
                    remove_country(current_com[1]);
                    break;
    
                case "zmień":
                    if (current_com.length < 4) {
                        window.alert("za mało argumentów");
                    } else {
                        if (!["zaszczepionych", "przypadki", "śmierci"].includes(current_com[1])) {
                            window.alert("błędna składnia");
                        }
                        if (current_com[1] == "zaszczepionych") {
                            alter_vax(current_com[2], current_com[3]);
                        }
                        if (current_com[1] == "przypadki") {
                            alter_cases(current_com[2], current_com[3]);
                        }
                        if (current_com[1] == "śmierci") {
                            alter_deaths(current_com[2], current_com[3]);
                        }
                    }
                    break;
    
                case "odczytaj":
                    show_country_data(current_com[1]);
                    break;

                default:
                    window.alert("niepoprawna składnia!");
                    break;
            } 

        }
        if (web_storage.checked) {
            localStorage.setItem("countries", JSON.stringify(countries));
            localStorage.setItem("vaccinations", JSON.stringify(Array.from(vaccinations.entries())));
            localStorage.setItem("cases", JSON.stringify(Array.from(cases.entries())));
            localStorage.setItem("deaths", JSON.stringify(Array.from(deaths.entries())));
        }
    }
}; 

function add_country(name) {
    if (countries.includes(name)) {
        window.alert("kraj jest już w bazie.");
    } else {
        countries.push(name);
    }
}

function remove_country(name) {
    if (countries.includes(name)) {
        countries.pop(countries.indexOf(name));
        vaccinations.delete(name);
        cases.delete(name);
        deaths.delete(name);
    } else {
        window.alert("nie znaleziono kraju.");   
    }   
}

function alter_vax(name, vax) {
    if (! countries.includes(name)) {
        add_country(name);
    }
    vaccinations.set(name, vax);
}


function alter_cases(name, no_cases) {
    if (! countries.includes(name)) {
        add_country(name);
    }
    cases.set(name, no_cases);
}

function alter_deaths(name, no_deaths) {
    if (! countries.includes(name)) {
        add_country(name);
    }
    deaths.set(name, no_deaths);
}

function show_country_data(name) {
    if (countries.includes(name)) {
        let v = vaccinations.get(name);
        let c = cases.get(name);
        let d = deaths.get(name);
        show_data.innerHTML = "\t" + name + 
                "<br> zaszczepieni: " + v + "<br> przypadki: " + c + "<br> zgony: " + d;
    } else {
        window.alert("nie znaleziono kraju.");
    }
}

var expect = chai.expect;

describe('the remove_country() function', function() {
    it('remove_country("Polska") -> countries = [], cases = {}', function() {
        add_country("Polska");
        remove_country("Polska");
        expect(countries.length).to.equal(0);
        expect(cases.size).to.equal(0);
    });
});


describe('the add_country() function', function() {
    it('add_country("Polska")  ->  countries = ["Polska"]', function() {
        add_country("Polska");
        expect(countries.toString()).to.equal("Polska");
    });
});

describe('the alter_cases() function', function() {
    it('alter_cases("Polska", 10)  ->  cases["Polska"] = 10', function() {
        alter_cases("Polska", 10);

        expect(cases.get("Polska")).to.equal(10);
    });
});


