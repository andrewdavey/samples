/// <reference path="namespace.js" />
/// <reference path="~/Client/Shared/knockout.js" />

(function () {
    "use strict";

    // Allows the user to enter the text and importance of a new note.
    var AddNoteViewModel = function() {
        this.text = ko.observable();
        this.important = ko.observable();
    };

    AddNoteViewModel.prototype.template = "AddNote";
    
    AddNoteViewModel.prototype.add = function () {
        this._requireModal();
        
        var newNote = {
            text: this.text(),
            important: this.important()
        };
        // Close the modal, passing the new note object as the result data.
        this.modal.close(newNote);
    };

    AddNoteViewModel.prototype.cancel = function () {
        this._requireModal();
        
        // Close the modal without passing any result data.
        this.modal.close();
    };

    AddNoteViewModel.prototype._requireModal = function() {
        if (!this.modal) {
            throw new Error("AddNoteViewModel must be used with the `showModal` helper function.");
        }
    };


    app.AddNoteViewModel = AddNoteViewModel;
    
}());