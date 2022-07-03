import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourcesAll } from '../components';
class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (<HTMLElement>document.querySelector('.sources')).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: ISourcesAll) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISourcesAll) => this.view.drawSources(data));
    }
}

export default App;
