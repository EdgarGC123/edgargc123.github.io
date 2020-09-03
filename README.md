# The Avatar Legends!

## Welcom to my site!

### Here's the known information based on the two series, Legend of Aang and Legend of Kora!

In order to build this project, I first needed a good api link that provides all the information I needed. Luckily I found one, but provides a bit too much information that isn't as useful. So I decided to just stick to the information that I know will make the project both a great website and easy to use.

The link used for this project can be found here:
https://last-airbender-api.herokuapp.com

I decided to simply stick with the information about the known avatar's. Based on both shows, there are hundreds of them, but the only information available is of these 7 based on the API. After doing some research, there's only knowledge of 9 of them, but the details behind them is very loose.

### Methods and Tools Used + Bugs and Features

My goal was to attempt to make my information page as simple as possible. Along with the code itself.

In order to achieve this, I only have the API AJAX call once throughout the entire code. My goal was to use the API as little as possible.

#### Collecting Data

The first thing I ran into was deciding on which link to use as there were different links for different characters in all the shows. There's nearly 500 characters found in total from this AP. Once I found the right link for the Avatar's only, I hardcoded it in to work with throughout the entire project. However, I decided to leave it as a function in case I ever chose to make it variable, I started working on this with buttons based on the html but I decided not to use them.

#### Reading The Data

From here, I realized that collecting the data was easy as it was all an array of objects, something we learned how to manage in class. The array represented every character, the object held all the details regarding that character. So I wrote for For Of loop to go through every individual character.

#### Useless Information

Afterword, I found repeated characters from the shows. For example, there's three Aang's in the API, and I didn't want to show them all on the site, especially considering one of those carried images of Aang based on the video game cover and just didn't look that good. In order to to avoid using characters like these I decided to use Regular Expression which looks for any character's name and searches for parenthesis, open '(' and close ')'. It's the first thing that runs after entering the loop and if it is true, it skips that character. I even included a console log to see which character i'm removing or ignoring. I quickly realized some characters were in there that I didn't want deleted, I manually wrote them out of the if statements to make sure those weren't skipped.

#### Reformatting

Initially, I wasn't saving the data anywhere and was simply creating the characters and their corresponding divs along with their action listeners in one large block of code which was my "collectData" function. Although it ran great, if I ever wanted to make improvements or adjustments in the future, it would be harder to follow and more difficult to work with. So I decided to store every character into a globally accessed empty array, and as I'm creating the divs and giving them their character, I saved the index of each individual character based on the length of the array. This way I can reference the character later to collect the details in a separate function. This index was saved as the ID of the div.

#### Global Array

Another tool i'm using is the jQuery search div attributes function. Similar to when selecting all classes or id's, I chose to specifically search for the value of an id to collect the index of the character that was clicked. This would allow me to reference my character from my global array and via that index. I would then create a modal and append that to the body (css was already created to handle that ID) and then I would append the a textbox to the modal. since it's appending to the body, it's essentially skipping and on top of everything found in the container, aka the list of all the characters present on the page.

#### Avatar Details & Google Text

From here, now that I'm able to access my details information of a particular character based on what div was clicked on the page, I can then start spitting all the information on to my text-box. I wanted to make it look like secret file information so I gave it a text that made it seem like some top secret information as well. I used Google's API for this.

#### Bubbling

The next feature I wanted to add was being able to click anywhere on the modal to as well as the close button to close the textbox and modal. although this part was easy, I noticed it was closing whenever I clicked the textbox too. I had to study bubbling and click propagation further, eventually realizing that I didn't need to change my modal listener, I just needed to create a listener for text-box to do nothing in order to prevent the propagation.

#### Final Video's

With as much time and effort spent on both reformatting, bubbling and along with some very odd css issues, I decided to keep the last part simple. I created a footer that would show two videos, both the intro's of the show's The legend of Aang and the legend of Korra found on Youtube as embedded video's.

#### Something I would want to add

I would want to add a few buttons to pull different characters. For example, a Fire Bender's button that, when clicked, would call the api, collect only firebenders or those known to be of the fire nation and display them all. Same goes for all the elements and an All avatar's button to bring us back to the original page. The problem is that this would cause multiple calls to the API, which does sometimes cause a lag before displaying all the characters. I would have to find a way to make a single call for all the characters I need per page or per button click. That may require me to make separate arrays, each representing their own button. so when a button is clicked, I would clear the existing character divs, also change the title of the page, then run through the new array and create those characters there. Although it may be easier to just pull the api once and save them on different pages.
