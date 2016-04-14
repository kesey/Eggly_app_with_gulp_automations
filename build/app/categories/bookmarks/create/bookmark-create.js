angular
    .module('categories.bookmarks.create', [])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('eggly.categories.bookmarks.create', {
                url: '/bookmarks/create',
                templateUrl: 'app/categories/bookmarks/create/bookmark-create.tmpl.html',
                controller: 'CreateBookmarkCtrl as createBookmarkCtrl'
            });
    }])
    .controller('CreateBookmarkCtrl', ['$state', '$stateParams', 'BookmarksModel', function($state, $stateParams, BookmarksModel){
        var createBookmarkCtrl = this;

        function returnToBookmarks() {
            $state.go('eggly.categories.bookmarks', {
                category: $stateParams.category
            });
        }

        createBookmarkCtrl.cancelCreating = cancelCreating;

        function cancelCreating() {
            returnToBookmarks();
        }

        createBookmarkCtrl.createBookmark = createBookmark;

        function createBookmark(bookmark) {
            BookmarksModel.createBookmark(bookmark);
            returnToBookmarks();
        }

        function resetForm() {
            createBookmarkCtrl.newBookmark = {
                title: '',
                url: '',
                category: $stateParams.category
            };
        }

        resetForm();
    }]);