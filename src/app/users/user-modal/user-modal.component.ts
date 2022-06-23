import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  user: User;
  depts: any[];
  loading: boolean;
  title: string = 'Create User';
  editMode: boolean;
  constructor(public userService: UsersService,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
    this.getDepts();
    if (!this.data) {
      this.user = new User();
      this.editMode = false;
    } else {
      this.user = this.data;
      this.title = 'Edit User';
      this.editMode = true;
    }
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  save(form: NgForm) {
    this.loading = true;
    if (form.form.status === 'VALID') {
      if (this.userService.formValidation(form, 'phonenumber') != undefined) {
        this.loading = false;
        return
      }

      if (this.editMode) {
        this.userService.editUser(this.user).subscribe({
          next: (res: any) => {
            if (res.id) {
              this.dialogRef.close({ status: 'success' });
            }
            this.loading = false;
          }
        })
      } else {
        this.userService.createUser(this.user).subscribe({
          next: (res: any) => {
            if (res.name) {
              this.dialogRef.close({ status: 'success' });
            }
            this.loading = false;
          }
        })
      }

    } else {
      this.loading = false;
    }
  }

  getDepts() {
    this.depts = [];
    this.userService.getDepartments().subscribe((res) => {
      Object.entries(res).forEach(([key, value]) => {
        let obj = { id: key, ...value }
        this.depts.push(obj);
      });
    })
  }

}
