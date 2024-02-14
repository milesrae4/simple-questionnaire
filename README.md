# Getting Started
![quiz](https://i.postimg.cc/c1zSHqY6/185707676-a0988337-560d-4016-b8cc-8f8369d8fc59.gif)  

First ensure you're on node version **v16.20.2**. `.nvmrc` will enforce this version.  
Recommended node version managers: **[n](https://github.com/tj/n)** or **[nvm](https://github.com/nvm-sh/nvm)**

Make sure to have **[docker](https://www.docker.com/)** installed, and on Windows OS ideally running within **[WSL (Windows Subsystem For Linux)](https://learn.microsoft.com/en-us/windows/wsl/install)** or you may have script command conflicts.

Install dependencies

```bash
 > yarn
```

Build the project

```bash
 > yarn build
```

Start the database

```bash
 > yarn db:start
```

Optionally have the build watch for changes

```bash
 > yarn build:watch
```

Run the core-service server (run in new tab/window/pane if running `build:watch`)

```bash
 > yarn start:watch
```

Finally boot up the React dev server and happy coding! (run in new tab/window/pane) 🎉

```bash
 > yarn web
```
