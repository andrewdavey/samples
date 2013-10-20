/// <reference path="angular.d.ts"/>

class KittenController {

    constructor(
        private $scope: ng.IScope,
        private debounce: IDebounce
        ) {
        this.watchForSizeChanges();
    }

    // Public properties we'll bind to in the UI
    width: number = 400;
    height: number = 300;
    status: string;
    imageUrl: string;

    private watchForSizeChanges() {
        // Use the debounce service to avoid spaming placekitten.com
        // with lots of requests at once.
        var delayMilliseconds = 250;
        var updateImageUrl = this.debounce(() => this.updateImageUrl(), delayMilliseconds);

        this.$scope.$watch(
            // When width or height changes
            () => [this.width, this.height],
            // Invoke this function
            updateImageUrl,
            // "Deep" watch the array contain width and height for changes
            true
        );
    }

    private updateImageUrl() {
        var url = this.getImageUrl();
        if (!url) return false;

        this.status = "Loading image...";
        // Pre-load the image before trying to display it.
        var image = new Image();
        image.onload = () => {
            // This callback is invoked from outside of Angular.
            // Use $apply to get back into Angular's digest loop.
            this.$scope.$apply(() => {
                this.imageUrl = url;
                this.status = "";
            });
        };
        image.onerror = () => {
            this.$scope.$apply(() => this.status = "Error loading image");
        };
        image.src = url;
    }

    private getImageUrl() {
        if (this.width > 0 && this.height > 0) {
            return "http://placekitten.com/" + this.width + "/" + this.height;
        } else {
            return null;
        }
    }
}

function debounceFactory($timeout: ng.ITimeoutService): IDebounce {
    return function (func: Function, threshold: number, execAsap?: boolean) {
        var timeoutId;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeoutId = null;
            };

            if (timeoutId) {
                $timeout.cancel(timeoutId);
            } else if (execAsap) {
                func.apply(obj, args);
            }

            timeoutId = $timeout(delayed, threshold);
        };
    };
}

interface IDebounce {
    (func: Function, threshold: number, execAsap?: boolean): () => void;
}

// Define the Angular module for our application.
var app = angular.module("app", []);
app.controller("KittenController", ["$scope", "debounce", KittenController]);
app.factory("debounce", ["$timeout", debounceFactory]);