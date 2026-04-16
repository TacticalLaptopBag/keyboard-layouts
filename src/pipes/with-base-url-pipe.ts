import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

@Pipe({
    name: 'withBaseUrl',
})
export class WithBaseUrlPipe implements PipeTransform {
    transform(path: string): string {
        return `${environment.baseUrl}${path}`;
    }
}
