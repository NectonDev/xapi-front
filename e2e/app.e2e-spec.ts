import { XapiCliPage } from './app.po';

describe('xapi App', () => {
  let page: XapiCliPage;

  beforeEach(() => {
    page = new XapiCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
