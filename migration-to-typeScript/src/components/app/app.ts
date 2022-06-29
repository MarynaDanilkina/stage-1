import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourcesAll } from '../components';
class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document
            .querySelector('.sources') as HTMLElement)
            .addEventListener('click', (e) => this.controller.getNews(e, (data: ISourcesAll) => this.view.drawNews(data)));
        this.controller.getSources((data: ISourcesAll) => this.view.drawSources(data));
    }
}

export default App;
