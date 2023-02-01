# Kata Topics

## First steps

This project initially was launched on Node version `14.17.1`, therefore to be sure about compatibility you can use `14.x` node versions by adding them to `nvm` manually or if, you're on MacOS, by running 

### `nvm use`

to use `lts/fermium` version pointed in `.nvmrc` file.

After setting the node version, you need to install all packages by running

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Launches both web server and proxy custom server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Setting up Unsplash Api Key

Following [Unsplash Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines), it is recommended to initialize Unsplash API on server side in order to not reveal the api key. The key is stored in `local.env` file under the `UNSPLASH_API_KEY` record, which initially will contain a dummy value, thus initially requests to unsplash service are going to be unsuccessful. In order to have requests running successfully next steps are required: 
- Join Unsplash and create a demo application following the [guide](https://unsplash.com/documentation#creating-a-developer-account)
- In your account's created demo application find `Access key` and copy it
- In project directory open `server/local.env` file and replace `{YOUR_API_KEY}` with your copied `Access key` from Unsplash
- Terminate the server and run `npm start` again for changes to become active