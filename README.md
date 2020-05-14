# internshala-automation

## About
An automated script which can apply for multiple internships according to user preference. It works on Internshala Platform.
It filters internships according to your preferences and applies to all of them and saves you a lot of time. Also, you don't have to go through that same boring procedure of uploading resume, giving assesment answers, etc. 

See how it works <a href="https://www.linkedin.com/posts/anandshankar27_automation-seleniumwebdriver-selenium-activity-6665891746649636864-4EAY/">here</a>.

## How to set it up locally ?

### System Requirements
```
  Nodejs
  Google Chrome
```

### STEP 1
#### Clone Repo
```
  git clone https://github.com/anandshankar27/internshala-automation/
```
 
#### Or you can fork this repo and then
```
  git clone https://github.com/YOUR_GITHUB_USERNAME/internshala-automation/
```

### STEP 2
Go to project directory & Install all npm modules 
```
  cd internshala-automation/
  npm install
``` 


### STEP 3
Create a credentials.json inside config folder </br>
```
  cd config/
  touch credentials.json
```

Your credentials.json should contain your Internshala credentials
```
  {
    "email" : "USER_EMAIL",
    "password" : "USER_PASSWORD"
  }
```

### STEP 4
Change your preferences in ```internshala-automation/config/preferences.json``` 

### STEP 5
Change your assessment answers in ```internshala-automation/config/answers.json``` 

### STEP 6
If you have followed above steps in sequence then run it
```
  cd ../
  node app.js
```
Now watch your browser applying for multiple interships.
