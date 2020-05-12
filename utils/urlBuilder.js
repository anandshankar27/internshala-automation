const preferences = require("./../config/preferences.json")

let profileURL = ''
let locationURL = ''
let durationURL = ''

preferences.category.forEach(element => {
    element = element.toLowerCase()
    profileURL += element + ","
})

preferences.location.forEach(element => {
    element = element.toLowerCase()
    locationURL += element + ","
})

profileURL = profileURL.substring(0, profileURL.length - 1)
locationURL = locationURL.substring(0, locationURL.length - 1)
durationURL = `duration-${preferences.duration}`

let tinyUrl
if (preferences.includeWorkFromHome == "true") {
    tinyUrl = `work-from-home-${profileURL}-jobs-in-${locationURL}/${durationURL}`
}
else {
    tinyUrl = `${profileURL}-internship-in-${locationURL}/${durationURL}`
}

tinyUrl = tinyUrl.replace(" ", "%20")

const url = `https://internshala.com/internships/${tinyUrl}`
// console.log(url)
module.exports = {
    "url" : url
}