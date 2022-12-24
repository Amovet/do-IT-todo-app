<h1 align="center">Do IT app</h1>
<p align="center">

<img src="https://img.shields.io/badge/made%20by-Amovet-blue.svg" >

<img src="https://img.shields.io/badge/react-18.2.0-green.svg">

<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" >

<img src="https://img.shields.io/github/stars/Amovet/AnkeanBeatWebsite.svg?style=flat">

</p>

<img src="https://user-images.githubusercontent.com/57827473/209444912-4f1e5435-2e47-410c-adb0-be0edfe6ad07.png" width="100%">

<h2 align="center"><a  href="https://do-it-app.site/" target="_blank">View app</a> </h2>

## Description
The site was created to optimize the development process, implemented by scratch on **React** using **Redux**, **Redux-saga**. BackEnd implemented on **Node js** framework - **Express js**,  with registration and share using **JWT**,
with the ability to share workspaces with other users, as well as attach files to tasks and add comments.

<p align="center">**small demonstration of the use**</p>

<img src="https://user-images.githubusercontent.com/57827473/209446597-c1f238e7-6b92-481e-a73b-aa0f4c80f6b6.gif" width="100%">

there is a section in the workspace settings that allows you to share your workspace with others using a secret word

<h2 align="center"><img src="https://user-images.githubusercontent.com/57827473/209446818-69b1fbde-0321-48a8-b551-7343de046e5a.JPG" align='center'></h2>

After installing the secret word, you can get a link (IMPORTANT: the link is valid only for 15 minutes, after the time you need to generate a new link)

<h2 align="center"><img src="https://user-images.githubusercontent.com/57827473/209447027-28275ab6-d56d-4ffd-8d7a-823eb69f962c.JPG" align='center'></h2>


## Project setup


(windows*)
```
git clone https://github.com/Amovet/do-IT-todo-app.git
cd .\backend
npm install
```
<p align="left">then you need change SecretOrPrivateKey in backend/.env (to any other key)</p>
<p align="left">paste your own MongoDB_URL url in backend/index.js</p>


```
npm start
```

<p align="left">In new console</p>

```
cd .\frontend\
npm install
npm start
```
