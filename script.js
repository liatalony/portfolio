"use strict";
window.addEventListener("DOMContentLoaded", init);

function init() {
  const profession = ["Multimedia Designer", "Web Developer"];
  setTimeout(() => {
    type();
  }, 2500);
  const prev = document.querySelector(".previous");
  const next = document.querySelector(".next");
  const projects = document.querySelector(".content");
  let index = 0;
  let i;
  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);
  const dots = document.querySelectorAll(".dot");
  dots[index].classList.add("active");

  //dots.forEach(colorChange);

  function goNext() {
    console.log("going next");
    if (index == 2) {
      //positionValue = 0;
      index = 0;
    } else {
      //positionValue += 100;
      index++;
    }
    projects.style.left = "-" + index * 100 + "vw";
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[index].classList.add("active");
  }

  function goPrev() {
    console.log("going back");
    if (index == 0) {
      index = 2;
    } else {
      index = index - 1;
    }
    projects.style.left = "-" + index * 100 + "vw";
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[index].classList.add("active");
  }
  function switchProject() {
    projects.style.left = "-" + index * 100 + "vw";
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[index].classList.add("active");
  }
  function colorChange(dot) {
    dot.addEventListener("click", () => {
      console.log(dot.className);

      dots.forEach((e) => {
        e.style.backgroundColor = "lightgray";
      });
      dot.style.backgroundColor = "gray";
      if (dot.className == "dot1 dot") {
        projects.style.left = "0";
      } else if (dot.className == "dot2 dot") {
        projects.style.left = "-100vw";
      } else {
        projects.style.left = "-200vw";
      }
    });
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
}
//for (let letter = 0; letter < selected.length; letter++) {}
