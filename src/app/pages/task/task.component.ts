import {Component, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TaskService} from './task.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/task.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CreateTaskComponent} from './create-task/create-task.component';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    providers: [TaskService]
})
export class TaskComponent implements OnDestroy {
    dataSource = new MatTableDataSource<User>();
    tasks: User[] = [];
    dialogRef: MatDialogRef<any>;
    totalTaskCount = 0;

    private initSub: Subscription;
    private saveSub: Subscription;

    constructor(private service: TaskService,
                private matSnackBar: MatSnackBar,
                private router: Router,
                public auth: AuthenticationService,
                public matDialog: MatDialog) {
        this.init();
    }

    onShowPopup(action = 'add', task = null): void {
        this.dialogRef = this.matDialog.open(CreateTaskComponent, {data: {action, task}});

        this.dialogRef.afterClosed()
            .subscribe(res => {
                if (!res) {
                    return;
                }
                if (this.saveSub && !this.saveSub.closed) {
                    this.saveSub.unsubscribe();
                }
                const type: string = res[0];
                const item: string = res[1];
                switch (type) {
                    case 'edit':
                        this.saveSub = this.service.updateTask(item).subscribe((response) => {
                            let message = 'Updated!';
                            let act = 'Ok';
                            if (response.status === 'error') {
                                message = response.message;
                                act = 'Error!';
                            }
                            this.matSnackBar.open(message, act,
                                {
                                    panelClass: ['green-600-fg', 'primary-50-bg'],
                                    verticalPosition: 'top',
                                    duration: 2000,
                                }
                            );
                        });
                        break;
                    case 'add':
                        this.saveSub = this.service.createTask(item).subscribe((response) => {
                            let message = 'Created!';
                            let act = 'Ok';
                            if (response.status === 'error') {
                                message = JSON.stringify(response.message);
                                act = 'Error!';
                            } else {
                                this.dataSource.data.push(response.message);
                                this.totalTaskCount++;
                            }
                            this.matSnackBar.open(message, act,
                                {
                                    panelClass: ['green-600-fg', 'primary-50-bg'],
                                    verticalPosition: 'top',
                                    duration: 2000,
                                }
                            );
                        });
                        break;
                }
            });
    }

    onLogoutClick(): void {
        this.auth.logout();
        this.router.navigateByUrl('login').catch();
    }

    onValueChange(evt: any): void {
        if (evt.type === 'paginated' || evt.type === 'sorted') {
            this.initSub.unsubscribe();
            this.initSub = this.service.getTasksByOptions(evt.data)
                .subscribe((res) => {
                    this.dataSource.data = res.message.tasks;
                });
        } else if (evt.type === 'edit') {
            this.onShowPopup('edit', evt.data);
        }
    }

    ngOnDestroy(): void {
        this.initSub.unsubscribe();
    }

    private init(): void {
        this.initSub = this.service.getTasks()
            .subscribe((res: any) => {
                this.dataSource.data = res.message.tasks;
                this.totalTaskCount = res.message.total_task_count;
            });
    }
}
