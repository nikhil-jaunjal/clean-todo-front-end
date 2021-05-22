import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  noteList = [];
  showPopup: boolean = false;
  noteForm: FormGroup;
  invalidForm: boolean = false;
  apiErrorMessage: boolean = false;
  editMode: boolean = false;
  selectedNote: any;
  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getAllNotes();
  }

  getAllNotes(): void {
    this.noteService.getAllNotesByUserId().subscribe(
      (data: any) => {
        this.noteList = data.noteList;
      }, (err: any) => {
        this.showErrorNotification();
      });
  }

  showNotePopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.noteForm.reset();
    this.getAllNotes();
    this.showPopup = false;
    this.apiErrorMessage = false;
    this.invalidForm = false;
    this.selectedNote = null;
    this.editMode = false;
  }

  openPopupToEditNote(note: any): void {
    this.editMode = true;
    this.selectedNote = note;
    this.noteForm = this.formBuilder.group({
      title: [note.title, [Validators.required]],
      description: [note.description, [Validators.required]]
    });
    this.showNotePopup();
  }

  onSubmit(): void {
    this.invalidForm = false;
    if (this.noteForm.invalid) {
      this.invalidForm = true;
      return;
    }
    let newNote = this.noteForm.value;
    newNote['userId'] = localStorage.getItem("userId");
    if (this.editMode == false) {
      this.saveNote(newNote);
    } else {
      newNote["noteId"] = this.selectedNote.noteId;
      this.updateNote(newNote);
    }
  }

  saveNote(note: any) {
    this.noteService.save(note).subscribe(
      (data: any) => {
        this.closePopup();
        this.showSuccessNotification();
      }, (err: any) => {
        this.showApiErrorNotification();
      });
  }

  updateNote(note: any) {
    this.noteService.update(note).subscribe(
      (data: any) => {
        this.closePopup();
        this.showSuccessNotification();
      }, (err: any) => {
        this.showApiErrorNotification();
      });
  }

  deleteNote(id: number): void {
    this.noteService.delete(id).subscribe(
      (data: any) => {
        this.getAllNotes();
        this.showSuccessNotification();
      }, (err: any) => {
        this.showErrorNotification();
      });
  }

  showSuccessNotification(): void {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 3000);
  }

  showErrorNotification(): void {
    this.errorMessage = true;
    setTimeout(() => {
      this.errorMessage = false;
    }, 3000);
  }

  showApiErrorNotification() {
    this.apiErrorMessage = true;
    setTimeout(() => {
      this.apiErrorMessage = false;
    }, 3000);
  }

}
