
export interface Page<T>{
  content: T[],
  empty: boolean,
  first:boolean,
  last:boolean,
  number:number,
  numberOfElements:number,
  pageable:Pageable,
  size:number,
  sort:Sort,
  totalElements:number,
  totalPages:number

}


export interface Pageable{
  offset:   number,
  pageNumber: number,
  pageSize: number,
  paged: boolean,
  sort: Sort,
  unpaged: boolean
}
export interface Sort{
  empty: boolean,
  sorted: boolean,
  unsorted: boolean
}


export interface UserDetails{
  username: string,
  dogName: string,
  breed:string,
  dogAge:number,
  dogSex:DogSex,
  dogWeight: number,
  idComune:number
}
/*
 private Long idUser;
    private String dogName;
    private String breed;
    private int dogAge;
    @Enumerated(EnumType.STRING)
    private Sex dogSex;
    private int dogWeight;
    private long idComune;
* */
export enum DogSex {"M", "F"}

export const demoDetails:UserDetails={
  username:"Sample",
  dogName: "Sample",
  breed:"Sample",
  dogAge:99,
  dogSex:DogSex.F,
  dogWeight: 44,
  idComune:99
}
