let myCharacters = [];
let dataCall = "https://last-airbender-api.herokuapp.com/api/v1/characters/avatar";

optionClicked = (e) => {
  bId = $(e.currentTarget).attr("id");
  console.log("id of button clicked ",bId)
  const linkVar = "https://last-airbender-api.herokuapp.com";//general api rules is this link
  const linkAll =
    "https://last-airbender-api.herokuapp.com/api/v1/characters?perPage=$25?page=$12";
  const linkSingle =
    "https://last-airbender-api.herokuapp.com/api/v1/characters/random";

  const linkAvatar =
    "https://last-airbender-api.herokuapp.com/api/v1/characters/avatar";

  const fireNation = "https://last-airbender-api.herokuapp.com/api/v1/characters?affiliation=Fire+Nation";
  const waterTribe = "https://last-airbender-api.herokuapp.com/api/v1/characters?affiliation=Water+Tribe";
  const earthKingdom = "https://last-airbender-api.herokuapp.com/api/v1/characters?affiliation=Earth+Kingdom";
  const airNation = "https://last-airbender-api.herokuapp.com/api/v1/characters?affiliation=Air+Nation";

  if (bId==1){
    dataCall = fireNation;
  }else if(bId==2){
    dataCall = waterTribe;
  }else if(bId==3){
    dataCall = earthKingdom;
  }else if(bId==4){
    dataCall = airNation;
  }else if(bId==5){
    dataCall = linkSingle
  }else{
    dataCall = linkAvatar;
  }

  console.log("dataCall value is now: ", dataCall)
  $(".character").remove();
  collectData();
};

collectData = () => {
  const myLink = dataCall;

  $.ajax({
    url: myLink,
  }).then(
    (data) => {
      console.log(data);
      // testy = "thus of stuff"
      for (let char of data) {
        //first if statement clears out any unusable characters.
        if (//filters out bad photos
          char.photoUrl === undefined ||
          char.name == "Yangchen's predecessor" ||
          char.name == "Ru and Yaling" ||
          char.name == "Circus master" ||
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
        ) {//lets me know what character was removed 
          console.log("removing character: " + char.name);
          continue;
        }

        //we start creating divs to append to container
        const disDiv = $(`<div class='character' id='${myCharacters.length}'>`);//this is inside the for loop, myCharacters length is incrementing on every loop.
        const backImage = char.photoUrl;
        disDiv.css("background-image", `url(${backImage})`); //.append(name);

        //appending to container
        $(".container").append(disDiv);
        // disDiv.hide()

        // disDiv.on("hover",(event)=>{
        // disDiv.css("filter","grayscale(100%)");
        // })
        myCharacters.push(char);//add's the character to the array after it's already been appended.
        disDiv.on("click", clickedChar);//add's listener to the particular character.
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
  // $(".buttons").hide();
  $('button.data').on("click", optionClicked);
  // console.log("value should be all avatars:",test);


  collectData();
});
