import { ResponseModel } from "./responseModel";

export interface SingleResponseModel<T> extends ResponseModel{

    data:T ; //  Listresponse model  liste karşılamak için  örneğin hem data hem succes ,message gelirdi
}              // burada sadece tek bir json objesi geliyor