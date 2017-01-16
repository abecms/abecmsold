describe('Abe', function() {

  describe('data', function() {

    before(function(client, done) {
      done();
    });

    after(function(client, done) {
      client.end(function() {
        done();
      });
    });

    afterEach(function(client, done) {
      done();
    });

    beforeEach(function(client, done) {
      done();
    });

    it('Create an import post', function(client) {
      client
        .useXpath()
        .url('http://localhost:3003/abe/editor')
        .waitForElementVisible('//body')
        .click('//*[@id="selectTemplate"]/option[5]')
        .waitForElementVisible("//div[@data-precontrib-templates='import']//input[@id='name']", 1000)
        .setValue("//div[@data-precontrib-templates='import']//input[@id='name']", 'import')
        .click("//button[@type='submit']")
        .pause(1000)
        .waitForElementVisible('//*[@id="abeForm"]', 2000)
        .assert.urlEquals("http://localhost:3003/abe/editor/import.html", "Clicked URL Matches with URL of the New Window");
    });

    it('Abe type import json', function(client) {
      client
        .useXpath()
        .url('http://localhost:3003/abe/editor/import.html')
        .waitForElementVisible('//body')
        .click('//*[@id="language"]/option[2]')
        .click("//div[@class='toolbar']/div[@class='btns']/button[@class='btn btn-info btn-save'][2]")
        .assert.urlEquals("http://localhost:3003/abe/editor/import.html", "Clicked URL Matches with URL of the New Window");
    });

    it('Abe type import json', function(client) {
      client
        .useXpath()
        .url('http://localhost:3003/abe/editor/import.html')
        .waitForElementVisible('//body')
        .pause(2000)
        .frame(0)
        .expect.element("//*[@id='fh5co-logo']/a").text.to.contain('Abe demo fr');
    });
    
    it('The import post is deleted in the manager', function(client) {
      client
        .useXpath()
        .url('http://localhost:3003/abe/editor')
        .waitForElementVisible('//body')
        .pause(1000)
        .click("//table[@id='navigation-list']/tbody/tr[1]/td[7]/div/a")
        .pause(1000)
        .acceptAlert()
        .url('http://localhost:3003/abe/editor')
        .pause(2000)
        .expect.element("//table[@id='navigation-list']/tbody/tr[1]/td[2]/a").text.to.not.contain('/articles/ftest.html');
    });
  });
});