import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../services/end-point';
import {IPagination} from '../../models/pagination.model';
import {User} from '../../models/task.model';
import {TokenService} from '../../services/token.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    data: IPagination<User[]> = {pageIndex: 0, pageSize: 3};

    constructor(private  http: HttpClient,
                private token: TokenService,
                @Inject(API_BASE_URL) private hostUrl) {
    }

    getTasks(): Observable<any> {
        return this.http.get(this.hostUrl + '?developer=Zohid');
    }

    getTasksByOptions(options?: { field: string, direction: string }): Observable<any> {
        let url = `page=${this.data.pageIndex + 1}`;
        if (options) {
            url += `&sort_field=${options.field}&sort_direction=${options.direction}`;
        }
        return this.http.get(this.hostUrl + `?developer=Zohid&${url}`);
    }

    createTask(data): Observable<any> {
        const form = getFormData(data);
        return this.http.post(this.hostUrl + 'create?developer=Zohid', form);
    }

    updateTask(data): Observable<any> {
        const form = getFormData(data);
        const token = this.token.getToken();
        form.append('token', token);
        return this.http.post(this.hostUrl + `edit/${data.id}?developer=Zohid`, form);
    }
}

function getFormData(data): FormData {
    const form = new FormData();
    form.append('username', data.username);
    form.append('email', data.email);
    form.append('text', data.text);
    form.append('status', data.status);
    return form;
}
