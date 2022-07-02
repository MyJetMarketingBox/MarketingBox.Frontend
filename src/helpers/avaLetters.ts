export const avaLetters = ( userName : string ) => {
  return userName?.split(' ').map((item : any) => item[0]).join('').toUpperCase();
}