let myCharacters = [];

optionClicked = () => {
  const linkVar = "https://last-airbender-api.herokuapp.com";
  const linkAll =
    "https://last-airbender-api.herokuapp.com/api/v1/characters?perPage=$25?page=$12";
  const linkSingle =
    "https://last-airbender-api.herokuapp.com/api/v1/characters/random";

  const linkAvatar =
    "https://last-airbender-api.herokuapp.com/api/v1/characters/avatar";

  return linkAvatar;
};

collectData = () => {
  const myLink = optionClicked();

  $.ajax({
    url: myLink,
  }).then(
    (data) => {
      console.log(data);
      // testy = "thus of stuff"
      for (let char of data) {
        //first if statement clears out any unusable characters.
        if (
          char.photoUrl === undefined ||
          char.name == "Yangchen's predecessor" ||
          char.name == "Ru and Yaling" ||
          (/\(.+\)/.test(char.name) &&
            char.name != "Bumi (King of Omashu)" &&
            char.name != "Warden (Boiling Rock)" &&
            char.name != "Warden (prison rig)" &&
            char.name != "Wu (fortuneteller)" &&
            char.name != "Yung (captain)" &&
            char.name != "Malu (airbender)" &&
            char.name != "Ming (pro-bender)" &&
            char.name != "Iroh (United Forces general)" &&
            char.name != "Song (officer)")
        ) {
          console.log("removing character: " + char.name);
          continue;
        }

        //we start creating divs to append to container
        const disDiv = $(`<div class='character' id='${myCharacters.length}'>`);
        const backImage = char.photoUrl;
        disDiv.css("background-image", `url(${backImage})`); //.append(name);

        //appending to container
        $(".container").append(disDiv);
        // disDiv.hide()

        // disDiv.on("hover",(event)=>{
        // disDiv.css("filter","grayscale(100%)");
        // })
        myCharacters.push(char);
        disDiv.on("click", clickedChar);
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

clickedChar = (e) => {
  // console.log($(e.currentTarget).attr("id"));
  let char = myCharacters[$(e.currentTarget).attr("id")];
  console.log(char);
  const backImage = char.photoUrl;
  const pauseClick = $(e.currentTarget);
  pauseClick.unbind();

  const modal = $("<div id='modal'>");
  $("body").append(modal);
  modal.hide();
  modal.show("slow");
  const textBox = $("<div id='modal-textbox'>")
    .css("background-image", `url(${backImage})`)
    .appendTo(modal);
  const detail8 = $("<h3>").text(char.name).appendTo(textBox);
  const detail6 = $("<p class='ldetail'>")
    .text("Hair Color: " + char.hair)
    .appendTo(textBox);
  const detail4 = $("<p class='ldetail'>")
    .text("Eye Color: " + char.eye)
    .appendTo(textBox);
  const detail12 = $("<p class='ldetail'>")
    .text("Skin: " + char.skin)
    .appendTo(textBox);
  const detail5 = $("<p class='ldetail'>")
    .text("Gender: " + char.gender)
    .appendTo(textBox);
  const detail13 = $("<p class='ldetail'>")
    .text("Weapon: " + char.weapon)
    .appendTo(textBox);
  const detail10 = $("<p class='bdetail'>")
    .text("Predecessor: " + char.predecessor)
    .appendTo(textBox);
  const detail1 = $("<p class='bdetail'>")
    .text("Affiliation: " + char.affiliation)
    .appendTo(textBox);
  const detail11 = $("<p class='bdetail'>")
    .text("Profession: " + char.profession)
    .appendTo(textBox);
  const detail9 = $("<p class='bdetail'>")
    .text("Position: " + char.position)
    .appendTo(textBox);
  const detail2 = $("<p class='bdetail'>")
    .text("Allies: " + char.allies)
    .appendTo(textBox);
  const detail7 = $("<p class='bdetail'>")
    .text("Love: " + char.love)
    .appendTo(textBox);
  const detail3 = $("<p class='bdetail'>")
    .text("Enemies: " + char.enemies)
    .appendTo(textBox);

  const closeModal = $("<button id='clsbtn'>").text("Close").appendTo(textBox);

  $(".container").css("filter", "blur(.5rem)");
  //   $(".main").css("filter", "blur(.5rem)");

  //stops the bubbling from the textbox clicks going to modal
  textBox.on("click", (e) => {
    e.stopPropagation();
  });
  //removes modal slowly and also removes blur affect
  modal.on("click", (e) => {
    modal.hide("slow");
    $(".container").css("filter", "none");
    //rebinds the target after everything is loaded.
    pauseClick.on("click", clickedChar);
  });
  closeModal.on("click", () => {
    modal.hide("slow");
    $(".container").css("filter", "none");
    //rebinds the target after everything is loaded.
    pauseClick.on("click", clickedChar);
  });

  // setTimeout("", 2000);
};

// window.onclick = function (e) {
//   if (e.target == modal) {
//     modal.hide("slow");
//   }
// };

$(() => {
  $(".buttons").hide();

  collectData();
});
