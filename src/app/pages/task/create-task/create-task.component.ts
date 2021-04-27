import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/task.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
    selector: 'create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
    task: User = {};
    action = 'add';
    form: FormGroup;
    readonly isEditable: boolean;

    constructor(public matDialogRef: MatDialogRef<CreateTaskComponent>,
                private fb: FormBuilder,
                public auth: AuthenticationService,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.action = data.action;
        if (data.action === 'edit') {
            this.task = data.task;
            this.isEditable = true;
        }
        this.form = this.createTaskForm();
    }

    get primaryEmail(): AbstractControl {
        return this.form.get('email');
    }

    /**
     * Create contact form
     */
    createTaskForm(): FormGroup {
        return this.fb.group({
            id: [this.task.id || ''],
            username: [this.task.username || ''],
            email: [this.task.email || '', Validators.email],
            text: [this.task.text || ''],
            status: [this.task.status || 0]
        });
    }

}
