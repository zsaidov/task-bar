import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../models/task.model';
import {TaskService} from '../task.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnDestroy, OnInit {
    @Output() valueChange = new EventEmitter<{ type: string, data?: any }>();
    @Input() dataSource: MatTableDataSource<User>;
    @Input() total = 0;
    displayedColumns: string[] = ['id', 'username', 'email', 'text', 'status'];
    sortField = {
        id: true,
        username: true,
        email: true,
        text: true
    };

    constructor(public service: TaskService,
                public auth: AuthenticationService) {
    }

    onSortClick(action: string): void {
        const data = {field: action, direction: this.sortField[action] ? 'asc' : 'desc'};
        this.sortField[action] = !this.sortField[action];
        this.valueChange.emit({type: 'sorted', data});
    }

    ngOnDestroy(): void {
        this.valueChange.unsubscribe();
    }

    onSelectionChange(evt): void {
        this.service.data.pageSize = evt.pageSize;
        this.service.data.pageIndex = evt.pageIndex;
        this.valueChange.emit({type: 'paginated'});
    }

    onEditClick(data): void {
        this.valueChange.emit({type: 'edit', data});
    }

    ngOnInit(): void {
        if (this.auth.isLoggedIn) {
            this.displayedColumns.push('action');
        }
    }
}
