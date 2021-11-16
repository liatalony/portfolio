"use strict";
window.addEventListener("DOMContentLoaded", init);
const profession = ["Multimedia Designer", "Web Developer"];

function init() {
  setTimeout(() => {
    type();
  }, 2500);

  fetch("projects.json")
    .then((res) => res.json())
    .then((e) => {
      savedArray = e;
      newArray(savedArray);
    });

  fetch("images.json")
    .then((res) => res.json())
    .then((e) =>
      e.forEach((image) => {
        const img = document.createElement("img");
        img.src = "images/drawings/" + image.name;
        img.alt = image.name;
        document.querySelector(".drawings").append(img);
      })
    );
}

let savedArray = [];
let currentProjects = [];

function newArray() {
  currentProjects = savedArray;
  displayProjects(currentProjects);
}

function displayProjects(projects) {
  console.log(projects);

  document.querySelector(".content").innerHTML = "";
  projects.forEach(setProject);
}

function type() {
  const prof = document.querySelector(".profession");
  let count = 0;
  let selected = " ";
  let letterCount = 1;
  chooseProf();
  function chooseProf() {
    selected = profession[count];
    loop();
  }
  function loop() {
    setTimeout(() => {
      prof.textContent = selected.substr(0, letterCount);
      letterCount++;
      if (letterCount <= selected.length) {
        loop();
      } else {
        count++;
        letterCount = 0;
        if (count == profession.length) {
          count = 0;
        }
        setTimeout(() => {
          chooseProf();
        }, 1500);
      }
    }, 100);
  }
}
let counter = 0;
function setProject(project) {
  const projectTemplate = document.querySelector("template").content.cloneNode(true);

  projectTemplate.querySelector(".project-name").textContent = project.name;
  projectTemplate.querySelector(".desc").textContent = project.desc;
  projectTemplate.querySelector(".project-link").setAttribute("href", project.link);
  const base = projectTemplate.querySelector(".project-bg");
  base.style.backgroundImage = `url(${project.img})`;
  const details = projectTemplate.querySelector(".project-info");
  details.addEventListener("mouseover", () => {
    details.style.opacity = "1";
    base.style.transform = "scale(1.2)";
  });
  details.addEventListener("mouseout", () => {
    details.style.opacity = "0";
    base.style.transform = "scale(1)";
  });

  projectTemplate.querySelector(".project-container").style.animationDelay = counter + "s";
  counter += 0.1;
  document.querySelector(".content").append(projectTemplate);
}

const filters = document.querySelectorAll(".filter");
filters.forEach((e) => {
  e.addEventListener("click", () => {
    counter = 0;
    filters.forEach((f) => {
      f.classList.remove("active");
    });
    e.classList.add("active");
    Filter(e.id);
  });
});
function Filter(id) {
  const filterValue = id;
  console.log(filterValue);

  if (filterValue === "all") {
    currentProjects = savedArray.filter(() => {
      return true;
    });
  } else {
    currentProjects = savedArray.filter((project) => {
      console.log(project.semester);

      return project.semester == id;
    });
  }
  displayProjects(currentProjects);
}