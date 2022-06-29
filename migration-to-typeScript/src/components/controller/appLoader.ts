import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '1e06f08d9131481faaf41527781b9c65',
        });
    }
}

export default AppLoader;
