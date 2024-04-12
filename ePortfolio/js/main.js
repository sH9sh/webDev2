const settings_icon_link = document.querySelector('#settings-icon');
const settings_panel = document.querySelector('#settings-panel');
const body = document.querySelector('body');
const sections = document.querySelectorAll('.main-section');
const userResetBtn = document.querySelector('#user-reset');
const userNameSpan = document.querySelector('#user-name');
const welcomeSection = document.querySelector('#welcome-section');
var defaultSettings = {};
const backgroundColorPicker = document.querySelector('#settings-bg-color');
const fontColorPicker = document.querySelector('#settings-font-color');
const fontSizeRange = document.querySelector('#settings-font-size');
const settingsReset = document.querySelector('#settings-reset');
const fontSizeDisplay = document.querySelector('#font-size');
const settingsTable = document.querySelector('#settings-table');
const settingsSaveBtn = document.querySelector('#settings-save');
const settingsClearBtn = document.querySelector('#settings-clear');
const menuIcon = document.querySelector('#burger-menu');
const navLinks = document.querySelector('#nav-links');

// console.log(settingsReset);
// console.log(backgroundColorPicker);
// console.log(welcomeSection);
// console.log(settings_icon_link);
// console.log(settings_panel);
// console.log(body);
// console.log(sections);
// console.log(userResetBtn);
// console.log(userNameSpan);
// console.log(fontColorPicker);
// console.log(fontSizeRange);
// console.log(settingsTable);
// console.log(settingsSaveBtn);
// console.log(settingsClearBtn);
// console.log(menuIcon);
// console.log(navLinks);
/**
 * Username settings
 */
// IF a User name has previously been saved to Local Storage, retrieve it's value
// and use it to welcome the user.
// Otherwise prompt them to provide their name, save it to Local Storage and use it
// to welcome them.

window.onload = function()
{
    if(localStorage.getItem('UserName'))
    {
        userNameSpan.innerText = localStorage.getItem('UserName');
    }
    else
    {
        setUserName();
    }
    let defSet = getDefaults();
    // console.log(defSet);
    setSettingsPanelValues(defSet);
}

// Function to ask for a username and save it to Local Storage
function setUserName(){

    let name = prompt('Please provide a username!');   // Ask the user for their name and assign it to the name variable.

    if(name)                                         // If name is not null or empty   
    {
        localStorage.setItem('UserName', name);      // Save to local storage
        userNameSpan.innerText = localStorage.getItem('UserName');
    }
    else
    {
        localStorage.setItem('UserName', 'Anonymous');      // Save to local storage
        userNameSpan.innerText = localStorage.getItem('UserName');
    }
   
}



// Reset the username when the reset button is clicked.
userResetBtn.addEventListener('click', setUserName);


/**
 * Default Settings
 */
let sectionComputedStyles = getComputedStyle(welcomeSection);

defaultSettings.bgColor = rgbToHex(sectionComputedStyles.backgroundColor);
defaultSettings.fontColor = rgbToHex(sectionComputedStyles.color);
defaultSettings.fontSize = parseInt(sectionComputedStyles.fontSize);
// console.log(defaultSettings.bgColor);
// console.log(defaultSettings.fontSize);

//Save the default settings to Local Storage using JSON
// console.log(defaultSettings);

localStorage.setItem('Defaults', JSON.stringify(defaultSettings));

// console.log(JSON.stringify(defaultSettings));


// console.log(localStorage.Defaults);
// console.log(JSON.parse(localStorage.Defaults));

// Set preferences to default
settingsReset.addEventListener('click', function(){
        let defSet = getDefaults();
        getDefaults();
        applySettings(defSet);
        setSettingsPanelValues(defSet);

    }
);

function getDefaults(){
    let defSet;
    if (localStorage.Defaults){
        defSet = JSON.parse(localStorage.Defaults);
    }
    // console.log(localStorage.Defaults);
    return defSet;
}


// Function to apply new settings to the sections.
function applySettings(settings){
    for(let i = 0; i < sections.length; i++)
    {
        let currentSection = sections[i];
        currentSection.style.backgroundColor = settings.bgColor;
        currentSection.style.color = settings.fontColor;
        currentSection.style.fontSize = settings.fontSize + "px";
    }
}

// Function to set the control values in the preferences panel
function setSettingsPanelValues(settings){
    backgroundColorPicker.value = settings.bgColor;
    // console.log(settings.bgColor);
    fontColorPicker.value = settings.fontColor;
    fontSizeRange.value = settings.fontSize;
    fontSizeDisplay.innerText = settings.fontSize;
    // console.log( backgroundColorPicker.value);
}





/**
 * User Preferences/ Settings.
 */

var tempSettings = null;
// Apply changes as the preference controls are toggled by the user.

settingsTable.addEventListener('change', function(){
    
    var tempSettings = {};

    tempSettings.bgColor = backgroundColorPicker.value;
    tempSettings.fontColor = fontColorPicker.value;
    tempSettings.fontSize = fontSizeRange.value;

    fontSizeDisplay.innerText = tempSettings.fontSize;

    console.log(backgroundColorPicker);
    console.log(tempSettings.bgColor);
    console.log(tempSettings.fontSize);
    console.log(tempSettings.fontColor);

    applySettings(tempSettings);
});

// Save the user defined references.
settingsSaveBtn.addEventListener('click', function(){
    var tempSettings = {};
    
    tempSettings.bgColor = backgroundColorPicker.value;
    tempSettings.fontColor = fontColorPicker.value;
    tempSettings.fontSize = fontSizeRange.value;

    if(tempSettings){
        localStorage.setItem('UserSettings', JSON.stringify(tempSettings));
        alert('Your settings have been saved!');
    }
    else{
        warn('Your settings have NOT been saved!')
    }

});

settingsClearBtn.addEventListener('click', function(){
    if (localStorage.UserSettings){
        let userSet = JSON.parse(localStorage.UserSettings);
        applySettings(userSet);
        setSettingsPanelValues(userSet);
    }
    else{
        let defSet = JSON.parse(localStorage.Defaults);
        applySettings(defSet);
        setSettingsPanelValues(defSet);

    }
});










settings_icon_link.addEventListener('mouseover', settingsMouseOver);
settings_icon_link.addEventListener('mousedown', settingsIconClick);
settings_icon_link.addEventListener('mouseout', settingsMouseOut);

function settingsMouseOver(){
    settings_icon_link.firstElementChild.setAttribute('class',"fa-solid fa-gear fa-spin-pulse fa-lg");
    settings_icon_link.firstElementChild.setAttribute('style',"--fa-animation-duration: 1s; --fa-animation-iteration-count: 3;");
}
function settingsIconClick(){
    if(settings_panel.style.display == 'none')     // == is comparing
    {   
        settings_panel.style.display = 'block';    // = is assigning
    }
    else
    {
        settings_panel.style.display = 'none'
    }
    settings_icon_link.firstElementChild.setAttribute('class',"fa-solid fa-gear fa-1.5xl");
    settings_icon_link.firstElementChild.setAttribute('style',"--fa-animation-duration: 1s; --fa-animation-iteration-count: 3;");
    
}

function settingsMouseOut(){
    settings_icon_link.firstElementChild.setAttribute('class',"fa-solid fa-gear fa-bounce");
    settings_icon_link.firstElementChild.setAttribute('style',"--fa-animation-duration: 1s;");
}


// Function to convert RGB colours to Hexadecimal colour values.
function rgbToHex(rgb)
{
    // Get the Red, Green, Blue from the rgb() value.
    // rgb(187, 182, 165)

    // Set the separator
    // let sep;
    // if(rgb.indexOf(',') > -1){
    //     sep = ',';
    // }
    //    else{
    //     sep = ' ';
    //    }

    // Ternary Operator can be used instead of a simple if statement as above
    // Syntax
//variable =  condition            true     false
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ' ;
    let rgbString;

    if(rgb.includes('a'))
    {
        // split rgb using separator
        rgbString = rgb.substr(5).split(')')[0].split(sep);
    }
    else
    {
        rgbString = rgb.substr(4).split(')')[0].split(sep);
    }

    let red = (+rgbString[0]).toString(16).trim();
    let green = (+rgbString[1]).toString(16).trim();
    let blue = (+rgbString[2]).toString(16).trim();

    // console.log(red);
    // console.log(green);
    // console.log(blue);

    if(red.length == 1){
        red = '0' + red;
    }

    if(green.length == 1){
        green = '0' + green;
    }
    if(blue.length == 1){
         blue = '0' + blue;
    }
    let hex = '#';

    hex = hex + red + green + blue;
    // console.log(hex);
    return hex;


}

// rgb(187, 182, 165)

/* Burger Menu */
menuIcon.addEventListener('click', function(){
    if(navLinks){
        if(navLinks.style.display == 'block'){
            navLinks.style.display = 'none';
        }
        else{
            navLinks.style.display = 'block';
        }
    }
    else{
        console.log('Could not find navLinks!!!')
    }
    
});