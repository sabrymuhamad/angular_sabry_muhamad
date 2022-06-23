import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { CoreModule } from '../core/core.module';
import { UsersComponent } from './users.component';
import { MaterialsModule } from '../materials/materials.module';
import { UserCardComponent } from './user-card/user-card.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    UsersComponent,
    UserCardComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
