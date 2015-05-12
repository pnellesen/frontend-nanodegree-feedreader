/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	var menu_class = ".menu";
	var menu_button_class = ".menu-icon-link";
	var entry_container = ".feed";
	var entry_class = ".entry";
	
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls defined and urls are not empty', function() {
        	for (var i = 0; i < allFeeds.length; i++) {
        		expect(allFeeds[i].url).toBeDefined();
        		expect(allFeeds[i].url.length).toBeGreaterThan(0);
        	}
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined and names are not empty', function() {
        	for (var i = 0; i < allFeeds.length; i++) {
        		expect(allFeeds[i].name).toBeDefined();
        		expect(allFeeds[i].name.length).toBeGreaterThan(0);
        	}
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    	 it('exists and has a class of \"' + menu_class + '\"', function() {
    		expect($(menu_class).length).toBeTruthy(); 
    	 });
    	
    	 it('is hidden by default', function() {
    		 expect($(menu_class).isVisible()).toBe(false);// See "$.fn.isVisible()" function at bottom
    	 });
    	 
    	 it('has a menu icon with a class of \"' + menu_button_class + '\"', function() {
			 expect($(menu_button_class).length).toBeTruthy();
		 })

		 /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    	 describe('The menu icon', function() {
    		 /* We can write this test so you can actually see (after a short delay) 
    		  * the menu open and close automatically when the icon click event is triggered.
    		  * Seeing is believing ;)
    		  */
    		 beforeEach(function(done) {
    			 setTimeout(function() {
    				 $(menu_button_class).trigger('click');
    				 // NOTE: per the CSS for the ".menu" class, the transition will take .2s to complete.
        			 // We Must wait for it to finish (after the 'click' event) before checking position
    				 setTimeout(function() {
        				 done();
    			    }, 300);
    			 }, 500);
			  });
    		 /* NOTE: the following tests check the position of the ".menu" element
    		  * to verify that it's actually extending into the <body>. The only assumptions 
    		  * needed for this is that elements of class '.menu' and ".menu-icon-link" exist.
    		  * A simpler (but possibly less robust) test would be to 
    		  * check to see if the <body> has a class of "menu-hidden". However, if at some
    		  * point a different method (other than "toggleClass()") was used to display/hide the menu, this test could break 
    		  */
    		  it('displays the menu when clicked first time', function(done) {
    			  expect($(menu_class).isVisible()).toBe(true);
	       		  done();
       	  	 });
    		 it('hides the menu when clicked again', function(done) {
    			 expect($(menu_class).isVisible()).toBe(false);
	    		done();
	    	 });
	      });    	 
    });



    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    	it('has a function named loadFeed()', function() {
    		expect(loadFeed).toBeDefined();
    	});
    	it('has a container with class \"' + entry_container + '\"', function() {
    		expect($(entry_container).length).toBeTruthy();
    	});
    	/* We've already tested that allFeeds exists and has at least one url to check
    	 * Let's first empty out the .feed-list <ul>, run loadFeed(0) again 
    	 * and verify that .feed-list has at least one .entry element.
    	 * 
    	 * NOTE: if all we want to test here is that the .feed container has at least one entry after the page 
    	 * has loaded, then we don't need to reload the entries in this manner
    	 */
    	describe('Reload entries', function() {
        	beforeEach(function(done) {
        		$(entry_container).empty();
        		setTimeout(function() {
    				 loadFeed(0);
    				 setTimeout(function() {
    					 done();
    			    }, 500);
    		    }, 500);
        	});
        	it('clears the current entries, runs loadFeed(0) again, and repopulates the entries', function(done) {
        		expect($(entry_container).has(entry_class).length).toBeTruthy();
        		done();
        	});    		
    	});

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		
		/* We previously tested that the allFeeds object was defined
		 * and that it had at least one url/name. Since it's
		 * probably not likely that the content of a particular feed will change
		 * within the timespan these tests will run, let's make sure we have at least 
		 * two different feeds to compare.
		 */
		it('has more than one feed to select', function() {
			expect(allFeeds.length > 1).toBe(true);
		});
		it('2nd feed is different than first', function() {
			expect(allFeeds[0].url === allFeeds[1].url).toBe(false);
		});
		
		describe('2nd Feed Selection', function() {
			var initialContent = '';
			var newContent = '';
			beforeEach(function(done) {
	    		// let's first save the content of the .feed container, then 
	    		// fire off loadFeed(1) to get the 2nd feed. Give it 500ms to finish,
	    		// then save the content of the .feed container into a new object.
				// Finally, compare the two objects - if they're not identical, the content has changed.
	    		console.log("Start loadFeed call");
	    		setTimeout(function() {
	    			initialContent = $(entry_container).html();
					 setTimeout(function() {
						 loadFeed(1);
	    				 setTimeout(function() {
	        				 newContent = $(entry_container).html();
	        				 done();    					 
	    				 },500);
				    }, 500);
			    }, 500);
	    	});
	    	it('loads the 2nd feed and populates the page with new content',function(done) {
	    		 console.log("initial content: " + initialContent);
	    		 console.log("newContent: " + newContent);
	    		
	    		 expect($(entry_container).has(entry_class).length).toBeTruthy();
	    		 expect(initialContent === newContent).toBe(false);
	    		 done();
	    	 });
		});
		
	});
	
	
	/* --- END TEST SUITES --- */
    
    
    
    /* Simple test to determine whether or not the right edge of an element 
     * extends into its parent
     * if the left edge + the width is <= 0, it will not be visible
     */
    $.fn.isVisible = function() {
    	return((this.position().left + parseInt(this.css('width'),10)) > 0);
    }
}());
