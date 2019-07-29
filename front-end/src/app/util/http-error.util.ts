import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpErrorUtil {

  constructor(private toastr: ToastrService) { }

  handleHttpError(httpError: HttpErrorResponse) {
    if (httpError.error !== undefined &&
      httpError.error.errors !== undefined &&
      httpError.error.errors.length > 0) {
        this.toastr.error(httpError.error.errors.join(", "));
    }else{
      console.log(httpError.error['error']);
      if (httpError.status === 500) {
        this.toastr.error("Ops... Ocorreu um erro no sistema ao processar sua solicitação :( ");
      } else if (httpError.status === 401) {
        this.toastr.error("Ops... Você não tem acesso para acessar esse recurso :/ ");
      } else if (httpError.status === 400) {
        this.toastr.error("Ops... Aparentemente o servidor está fora por tempo indeterminado :'( ");
      } else {
        this.toastr.error("Ops... O Sistema está fora do ar :O ");
      }
    }
  }
}