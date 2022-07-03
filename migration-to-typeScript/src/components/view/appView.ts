import News from './news/news';
import Sources from './sources/sources';
import { ISourcesAll } from '../components';
export class AppView {
    public news: News;
    public sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ISourcesAll): void {
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesAll): void {
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
