/// <reference path="namespace.js" />
/// <reference path="EditNoteViewModel.js" />
/// <reference path="../Shared/knockout.js" />
/// <reference path="../Shared/utils/showModal.js" />

(function() {
    "use strict";

    // Imports
    var EditNoteViewModel = app.EditNoteViewModel;
    var showModal = utils.showModal;
    

    var NoteViewModel = function(data) {
        this.text = ko.observable(data.text);
        this.important = ko.observable(data.important);
    };

    NoteViewModel.prototype.edit = function () {
        // Convert this view model's observable properties into a plain JavaScript object.
        var noteData = ko.mapping.toJS(this);
        // Create an editor view model that will be initialized with the note data.
        var editNoteViewModel = new EditNoteViewModel(noteData);
        showModal({
            viewModel: editNoteViewModel,
            context: this
        }).then(function (updatedNoteData) {
            // Update the note view model (this) with the data
            // returned from the modal dialog.
            ko.mapping.fromJS(updatedNoteData, {}, this);
        });
    };
    

    // Exports
    app.NoteViewModel = NoteViewModel;
    
}());