/// <reference path="namespace.js" />
/// <reference path="AddNoteViewModel.js" />
/// <reference path="~/Client/Shared/knockout.js" />
/// <reference path="~/Client/Shared/utils/showModal.js" />

(function () {
    "use strict";

    // Imports
    var showModal = utils.showModal;
    var AddNoteViewModel = app.AddNoteViewModel;
    var NoteViewModel = app.NoteViewModel;

    // The root view model for the application
    var AppViewModel = function() {
        this.notes = ko.observableArray();
    };

    AppViewModel.prototype.addNote = function() {
        showModal({
            viewModel: new AddNoteViewModel(),
            context: this // Set context so we don't need to bind the callback function
        }).then(this._addNoteToNotes);
    };

    AppViewModel.prototype._addNoteToNotes = function(newNoteData) {
        this.notes.push(new NoteViewModel(newNoteData));
    };


    // Exports
    app.AppViewModel = AppViewModel;
    
}());