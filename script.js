let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// events object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },

    touch: {
        down: "touchdown",
        move: "touchmove",
        up: "touchend",
    }
};

let deviceType = "";

let draw = false;
let erase = false;

//detect touch device
const isTouchDevice = () => {
  try {

    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;

  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

//Create Grid
gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  //loop for creating rows
  for (let i = 0; i < gridHeight.value; i++) {
    //incrementing count by 2
    count += 2;
    //Create row div
    let div = document.createElement("div");
    div.classList.add("gridRow");
    //Create Columns
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      // unique ids for all columns (for touch screen specifically)
      col.setAttribute("id", `gridCol${count}`);



      col.addEventListener(events[deviceType].down, () => {
        //user starts drawing
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });
      
      col.addEventListener(events[deviceType].move, (e) => {
        // elementFromPoint returns the element at x,y position of mouse
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;

        checker(elementId);
      });

      //stop drawing
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      //append columns
      div.appendChild(col);
    }
    //append grid to container
    container.appendChild(div);
  }
});
function checker(elementId) {
  let gridColumns = document.querySelectorAll(".gridCol");
  gridColumns.forEach((element) => {

    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

//clear grid
clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});

//erase Button
eraseBtn.addEventListener("click", () => {
  erase = true;
});

//paint button
paintBtn.addEventListener("click", () => {
  erase = false;
});

//display grid width and height
gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridWidth.value = 0;
  gridHeight.value = 0;
};