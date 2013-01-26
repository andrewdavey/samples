/// <reference path="namespace.js" />
/// <reference path="../Shared/knockout.js" />
/// <reference path="../Shared/knockout.mapping-latest.debug.js" />

(function() {
    "use strict";

    var EditNoteViewModel = function (note) {
        // Copy note properties into this object.
        // An observable property is created for each.
        // e.g. this.text = ko.observable(note.text);
        ko.mapping.fromJS(note, {}, this);
    };

    EditNoteViewModel.prototype.template = "EditNote";

    EditNoteViewModel.prototype.save = function () {
        this._requireModal();

        // Convert this view model's observable properties into a plain JavaScript object. 
        // Then pass that back to the calling code.
        var updatedNote = ko.mapping.toJS(this);
        this.modal.close(updatedNote);
    };

    EditNoteViewModel.prototype.cancel = function () {
        this._requireModal();

        // Close the modal without passing any result data.
        this.modal.close();
    };

    EditNoteViewModel.prototype._requireModal = function () {
        if (!this.modal) {
            throw new Error("EditNoteViewModel must be used with the `showModal` helper function.");
        }
    };
    

    // Exports
    app.EditNoteViewModel = EditNoteViewModel;
    
}());