

/*
* ritorna il valore mod n di value,
* funziona per i numeri >=0 o -1*/
export function mod(value: number, n: number): number{
  if(value>=0) return value%n;
  else if(value==-1) return n-1;
  else return 6661995;
}
