/// <reference path="angular.d.ts"/>
var KittenController = (function () {
    function KittenController($scope, debounce) {
        this.$scope = $scope;
        this.debounce = debounce;
        // Public properties we'll bind to in the UI
        this.width = 400;
        this.height = 300;
        this.watchForSizeChanges();
    }
    KittenController.prototype.watchForSizeChanges = function () {
        var _this = this;
        // Use the debounce service to avoid spaming placekitten.com
        // with lots of requests at once.
        var delayMilliseconds = 250;
        var updateImageUrl = this.debounce(function () {
            return _this.updateImageUrl();
        }, delayMilliseconds);

        this.$scope.$watch(// When width or height changes
        function () {
            return [_this.width, _this.height];
        }, updateImageUrl, true);
    };

    KittenController.prototype.updateImageUrl = function () {
        var _this = this;
        var url = this.getImageUrl();
        if (!url)
            return false;

        this.status = "Loading image...";

        // Pre-load the image before trying to display it.
        var image = new Image();
        image.onload = function () {
            // This callback is invoked from outside of Angular.
            // Use $apply to get back into Angular's digest loop.
            _this.$scope.$apply(function () {
                _this.imageUrl = url;
                _this.status = "";
            });
        };
        image.onerror = function () {
            _this.$scope.$apply(function () {
                return _this.status = "Error loading image";
            });
        };
        image.src = url;
    };

    KittenController.prototype.getImageUrl = function () {
        if (this.width > 0 && this.height > 0) {
            return "http://placekitten.com/" + this.width + "/" + this.height;
        } else {
            return null;
        }
    };
    return KittenController;
})();

function debounceFactory($timeout) {
    return function (func, threshold, execAsap) {
        var timeoutId;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeoutId = null;
            }
            ;

            if (timeoutId) {
                $timeout.cancel(timeoutId);
            } else if (execAsap) {
                func.apply(obj, args);
            }

            timeoutId = $timeout(delayed, threshold);
        };
    };
}

// Define the Angular module for our application.
var app = angular.module("app", []);
app.controller("KittenController", ["$scope", "debounce", KittenController]);
app.factory("debounce", ["$timeout", debounceFactory]);
//# sourceMappingURL=app.js.map
