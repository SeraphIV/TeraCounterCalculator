// const request = require('request')
// const fs = require("fs");
// const https = require("https");
// const url =
//   "https://jsonbox.io/box_28a26747983acfdb501b/5d9dee93e6f3c60017ce16f5";

$(document).ready(function () {
  // Handler for .ready() called.

  weaknesses["Normal"] = ["Fighting"];
  weaknesses["Fighting"] = ["Flying", "Psychic", "Fairy"];
  weaknesses["Flying"] = ["Rock", "Electric", "Ice"];
  weaknesses["Poison"] = ["Ground", "Psychic"];
  weaknesses["Ground"] = ["Water", "Grass", "Ice"];

  weaknesses["Rock"] = ["Fighting", "Ground", "Steel", "Water", "Grass"];
  weaknesses["Bug"] = ["Flying", "Rock", "Fire"];
  weaknesses["Ghost"] = ["Ghost", "Dark"];
  weaknesses["Steel"] = ["Fighting", "Ground", "Fire"];
  weaknesses["Fire"] = ["Ground", "Rock", "Water"];

  weaknesses["Water"] = ["Grass", "Electric"];
  weaknesses["Grass"] = ["Flying", "Poison", "Bug", "Fire", "Ice"];
  weaknesses["Electric"] = ["Ground"];
  weaknesses["Psychic"] = ["Bug", "Ghost", "Dark"];
  weaknesses["Ice"] = ["Fighting", "Rock", "Steel", "Fire"];

  weaknesses["Dragon"] = ["Ice", "Dragon", "Fairy"];
  weaknesses["Dark"] = ["Fighting", "Bug", "Fairy"];
  weaknesses["Fairy"] = ["Poison", "Steel"];

  for (let i = 0; i < types.length; i++) {
    $("#type").append("<option>" + types[i] + "</option>");
  }

  counterWeakness(types[0]);

  $("#type").on("change", function () {
    counterWeakness(this.value);
  });
});



const types = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy"
];

const weaknesses = {};

function counterWeakness(type) {
  let counters = [];

  let wList = weaknesses[type];
  for (let i = 0; i < wList.length; i++) {
    let tCounters = weaknesses[wList[i]];
    counters = counters.concat(tCounters);
  }

  let groupedCounters = {};

  for (let i = 0; i < counters.length; i++) {
    var count = 1;

    for (let j = 0; j < counters.length; j++) {
      if (i !== j) {
        if (counters[i] === counters[j]) {
          count++;
        }
      }
    }

    groupedCounters[counters[i]] = count;
  }

  let sortable = Object.keys(groupedCounters).map(function (key) {
    return [key, groupedCounters[key]];
  });

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  $("#counters").text("");

  for (let i = 0; i < sortable.length; i++) {
    var item = sortable[i];
    $("#counters").append(
      "<div class='row mb-3'><div class='themed-grid-col siv-col-1'>" +
        item[1] +
        "x</div><div class='themed-grid-col siv-col-4'>" +
        item[0] +
        "</div></div>"
    );
  }
}
