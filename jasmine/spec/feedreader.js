/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* Test to ensure the allFeeds variable 
         * has been defined and not empty
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL defined', function () {
            allFeeds.forEach(function (feed) {
                // expect each url in allFeeds is defined
                expect(feed.url).toBeDefined();
                // expect each url in allFeeds is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name defined', function () {
            allFeeds.forEach(function (e) {

                expect(e.name).toBeDefined();
                expect(e.name.length).not.toBe(0);
            });

        });
    });


    /* This test suite is for testing correct 
     * functionality of the menu drawer 
     */
    describe('The menu', function () {

        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('hidden by default', function () {

            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        describe('menu changes visibility when the menu icon is clicked', function () {
            var body = $('body');
            // before expectations functions run, trigger click event on menu icon
            beforeEach(function () {
                $('.menu-icon-link').trigger('click');
            });
            // expect the menu displays correctly
            it('menu display', function () {
                expect(body.hasClass('menu-hidden')).toBeFalsy();
            });
            // expect hide the menu correctly
            it('hide menu ', function () {
                expect(body.hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });


    /* This test suite is for testing loadFeed() 
     * function when page is loaded.
     */
    describe('Initial Entries', function () {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('after loaded, at least one .entry element within .feed', function (done) {

            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite is to ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    describe('New Feed Selection', function () {

        var initFeed,
            newFeed;
        // Call loadFeed twice with different ids
        // to get different feeds 
        beforeEach(function (done) {
            loadFeed(0, function(){
                initFeed = $('.feed').find('.entry');
                loadFeed(1, function(){
                    newFeed = $('.feed').find('.entry');
                    done();
                });
            });
        });

        // ensure the content has been changed compared to the initial content
        it('Feed content has changed', function (done) {
            expect(initFeed).not.toBe(newFeed);
            done();
        });
        // go back to initial feed when finish
        afterAll(function (done) {
            loadFeed(0, done);
        });
    });
}());
