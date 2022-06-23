import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('deleteConfirmation') deleteConfirmation: TemplateRef<any>;

  users: User[];
  currentUser: User;
  constructor(private userService: UsersService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.userService.getAllUsers().subscribe((users) => {
      Object.entries(users).forEach(([key, value]) => {
        let obj = { id: key, ...value }
        this.users.push(obj);
      });
    })
  }

  addUserModal(data?: User) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      minWidth: '300px',
      maxWidth: '500px',
      data: data ? data : null,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.status === 'success') {
        this.getUsers();
        this._snackBar.open(`User is ${data ? 'updated' : 'created'} successfully!`, 'Close', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });
  };

  onDeleteUser() {
    this.dialog.open(this.deleteConfirmation, {
      width: '300px'
    });
  };

  removeUser() {
    this.userService.removeUser(this.currentUser).subscribe({
      next: (res: any) => {
        if (!res) {
          this.dialog.closeAll();
          this.getUsers();
          this._snackBar.open(`User is deleted successfully!`, 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      }
    })
  }

  getAction(e: any) {
    if (e.action === 'edit') {
      this.addUserModal(e.user);
    } else {
      this.currentUser = e.user;
      this.onDeleteUser();
    }
  }

}
