import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private _snackBar: MatSnackBar) { }

  alertUpdate(messagge: string, duration: number){
    this._snackBar.open(messagge,"",{
      duration,
      horizontalPosition:"center",
      verticalPosition: "bottom"
    });
  }

  ExistsListBehaviorSubject(data: any, listBehaviorSubject$: any): boolean{
    return !(listBehaviorSubject$.value === '' || JSON.stringify(listBehaviorSubject$.value)!== JSON.stringify(data));
  }
}
