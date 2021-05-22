import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import('./user-auth/user-auth.module').then(module => module.UserAuthModule) },
  { path: "notes", loadChildren: () => import('./note/note.module').then(module => module.NoteModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
