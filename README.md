# Mastering Fullstack JavaScript Tutorial

This repository contains the course source code of Fullstack JavaScript Development

## 01. NodeJS

Node.js® is an open-source, cross-platform JavaScript runtime environment

### 01a. Installing NodeJS Using nvm

`nvm` allows you to quickly install and use different versions of node via the command line.

To **install** or **update** nvm, you should run the install script. To do that, you may either download and run the script manually, or use the following cURL command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

To install NodeJS version 16, use the following command:

```sh
nvm install 16
```

If you want to see what versions are installed:

```sh
nvm ls
```

If you want to use different node versions to other than your system, use command:

```sh
nvm use 18
```

The first version installed becomes the default. To set a default Node version to be used in any new shell, use the alias 'default':

```sh
nvm alias default node
```

### 01b. Verifying Installation

To see if you already have Node.js and npm installed and check the installed version, run the following commands:

```sh
node -v
```

```sh
npm -v
```

### 01c. Creating New Project App

To create new NodeJS project, use command:

```sh
npm init
```

### 01d. Running index.js Using NodeJS

To run JavaScript file using NodeJS, use command:

```sh
node index.js
```

### 01e. Installing NPM Module/Package Into Project App

To install NPM module/package in your project (local), use `npm install <package_name>` or `npm i <package_name>` command. These following commands shown how to install moment package into your project:

```sh
npm install moment
```

or

```sh
npm i moment
```

### 01f. Verifying Package Installation

To see if you already have module/package installed in your system (global) or project (local), use commands:

- Global Package

```sh
npm ls --location=global
```

- Local Package

```sh
npm ls
```

### 01e. Running Project By Using Scripts

To run a NodeJS project by using scripts that you have written in the package.json, use these commands:

```sh
npm run start
```

or

```sh
npm start
```
