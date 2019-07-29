export class Body<T>{
  constructor(
      public data: T,
      public errors: []
  ) {}
}