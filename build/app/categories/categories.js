angular
    .module('categories', [
        'eggly.models.categories'
    ])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('eggly.categories', {
                url: '/',
                views: {
                    'categories@': {
                        controller: 'CategoriesListCtrl as categoriesListCtrl',
                        templateUrl: 'app/categories/categories.tmpl.html'
                    },
                    'bookmarks@': {
                        controller: 'BookmarksListCtrl as bookmarksListCtrl',
                        templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html'
                    }
                }
            });
    }])
    .controller('CategoriesListCtrl',['CategoriesModel', function(CategoriesModel){
        var categoriesListCtrl = this;
        CategoriesModel
            .getCategories()
            .then(function(result){
                categoriesListCtrl.categories = result;
            });
    }]);