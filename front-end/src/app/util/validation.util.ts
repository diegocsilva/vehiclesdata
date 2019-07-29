export class ValidationUtil {
  static nullOrEmpty(obj: any) : boolean{
    return obj !== null && obj !== ''
  }
}