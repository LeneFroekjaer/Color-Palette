"use strict";

let colorwheel = document.querySelector("#colorwheel");
colorwheel.addEventListener("input", colorPicher);
let hexString;

//console.log(toString((153 / 16) * 16) + toString(153 - (153 / 16) * 16));

function colorPicher() {
  hexString = colorwheel.value;
  const r = Number.parseInt(hexString.slice(1, 3), [16]);
  const g = Number.parseInt(hexString.slice(3, 5), [16]);
  const b = Number.parseInt(hexString.slice(5, 7), [16]);

  setBase();
  convertToHLS(r, g, b);

  return hexString;
}

function setBase() {
  ///////////////////// HEX-KODE PÅ BOKSEN "#base"
  document.querySelector("#base").style.background = hexString;
  document.querySelector(".baseTitle").innerHTML = "HEX" + " " + hexString;

  ///////////////////// HEX-KODE PÅ BOKSEN "#color_1"
  let color1 = document.querySelector("#color_1").style.background;
  let color1R = color1.substring(color1.indexOf("(") + 1, color1.indexOf(","));
  let color1G = color1.substring(
    color1.indexOf(",") + 1,
    color1.lastIndexOf(",")
  );
  let color1B = color1.substring(
    color1.lastIndexOf(",") + 1,
    color1.indexOf(")")
  );

  document.querySelector(".color_1_Title").innerHTML =
    "HEX:" +
    " " +
    "#" +
    Math.abs(color1R).toString(16) +
    Math.abs(color1G).toString(16) +
    Math.abs(color1B).toString(16);

  ///////////////////// HEX-KODE PÅ BOKSEN "#color_2"
  let color2 = document.querySelector("#color_2").style.background;
  let color2R = color2.substring(color2.indexOf("(") + 1, color2.indexOf(","));
  let color2G = color2.substring(
    color2.indexOf(",") + 1,
    color2.lastIndexOf(",")
  );
  let color2B = color2.substring(
    color2.lastIndexOf(",") + 1,
    color2.indexOf(")")
  );

  document.querySelector(".color_2_Title").innerHTML =
    "HEX:" +
    " " +
    "#" +
    Math.abs(color2R).toString(16) +
    Math.abs(color2G).toString(16) +
    Math.abs(color2B).toString(16);

  ///////////////////// HEX-KODE PÅ BOKSEN "#color_3"
  let color3 = document.querySelector("#color_3").style.background;
  let color3R = color3.substring(color3.indexOf("(") + 1, color3.indexOf(","));
  let color3G = color3.substring(
    color3.indexOf(",") + 1,
    color3.lastIndexOf(",")
  );
  let color3B = color3.substring(
    color3.lastIndexOf(",") + 1,
    color3.indexOf(")")
  );

  document.querySelector(".color_3_Title").innerHTML =
    "HEX:" +
    " " +
    "#" +
    Math.abs(color3R).toString(16) +
    Math.abs(color3G).toString(16) +
    Math.abs(color3B).toString(16);

  ///////////////////// HEX-KODE PÅ BOKSEN "#color_4"
  let color4 = document.querySelector("#color_4").style.background;
  let color4R = color4.substring(color4.indexOf("(") + 1, color4.indexOf(","));
  let color4G = color4.substring(
    color4.indexOf(",") + 1,
    color4.lastIndexOf(",")
  );
  let color4B = color4.substring(
    color4.lastIndexOf(",") + 1,
    color4.indexOf(")")
  );

  document.querySelector(".color_4_Title").innerHTML =
    "HEX:" +
    " " +
    "#" +
    Math.abs(color4R).toString(16) +
    Math.abs(color4G).toString(16) +
    Math.abs(color4B).toString(16);
}

function convertToHLS(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;
  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  //multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl (%f,%f%,%f%)", h, s, l); //just for testing
  //   const hslColor = ("hsl(%f,%f%,%f%", h, s, l);
  //   return hslColor;

  calculateColors(h, s, l);
  //colorwheel.addEventListener("click", analogous());
}

function calculateColors(h, s, l) {
  const colorSelect = document.querySelector("#color-select");

  if (colorSelect.value == "analogous") {
    analogous(h, s, l);
  } else if (colorSelect.value == "monochromatic") {
    monochromatic(h, s, l);
  } else if (colorSelect.value == "triad") {
    triad(h, s, l);
  } else if (colorSelect.value == "complementary") {
    complementary(h, s, l);
  } else if (colorSelect.value == "compound") {
    compound(h, s, l);
  } else if (colorSelect.value == "shades") {
    shades(h, s, l);
  }
}

function analogous(h, s, l) {
  document.querySelector("#color_1").style.background = `hsl(
    ${h + 115},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_2").style.background = `hsl(
    ${h + 90},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_3").style.background = `hsl(
    ${h - 90},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_4").style.background = `hsl(
    ${h - 115},    
    ${s}%, 
    ${l}%
  )`;
}

function monochromatic(h, s, l) {
  document.querySelector("#color_1").style.background = `hsl(
    ${h},    
    ${s}%, 
    ${l - 20}%
  )`;
  document.querySelector("#color_2").style.background = `hsl(
    ${h},    
    ${s}%, 
    ${l - 10}%
  )`;
  document.querySelector("#color_3").style.background = `hsl(
    ${h},    
    ${s}%, 
    ${l + 10}%
  )`;
  document.querySelector("#color_4").style.background = `hsl(
    ${h},    
    ${s}%, 
    ${l + 20}%
  )`;
}

function triad(h, s, l) {
  document.querySelector("#color_1").style.background = `hsl(
    ${h + 90},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_2").style.background = `hsl(
    ${h + 90},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_3").style.background = `hsl(
    ${h + 120},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_4").style.background = `hsl(
    ${h + 120},    
    ${s}%, 
    ${l}%
  )`;
}

function complementary(h, s, l) {
  document.querySelector("#color_1").style.background = `hsl(
    ${h + 180},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_2").style.background = `hsl(
    ${h + 180},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_3").style.background = `hsl(
    ${h + 180},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_4").style.background = `hsl(
    ${h + 180},    
    ${s}%, 
    ${l}%
  )`;
}
function compound(h, s, l) {
  document.querySelector("#color_1").style.background = `hsl(
    ${h + 120},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_2").style.background = `hsl(
    ${h + 90},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_3").style.background = `hsl(
    ${h + 180},    
    ${s}%, 
    ${l}%
  )`;
  document.querySelector("#color_4").style.background = `hsl(
    ${h + 180},    
    ${s}%, 
    ${l}%
  )`;
}
function shades(h, s, l) {
  document.querySelector("#color_1").style.background = `hsl(
    ${h},    
    ${s - 60}%, 
    ${l}%
  )`;
  document.querySelector("#color_2").style.background = `hsl(
    ${h},    
    ${s - 30}%, 
    ${l}%
  )`;
  document.querySelector("#color_3").style.background = `hsl(
    ${h},    
    ${s + 30}%, 
    ${l}%
  )`;
  document.querySelector("#color_4").style.background = `hsl(
    ${h},    
    ${s + 60}%, 
    ${l}%
  )`;
}
