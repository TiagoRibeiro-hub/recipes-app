import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "@services/auth/interceptors/auth-interceptor.service";
import { LoaderInterceptorService } from "@services/loader/interceptors/loader-interceptor.service";

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule { }