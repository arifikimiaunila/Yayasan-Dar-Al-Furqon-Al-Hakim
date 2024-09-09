 export function getCookie(cname: String):String {
  let name: String = cname + "=";
  let decodedCookie: String = decodeURIComponent(document.cookie);
  let ca: String[] = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c: Object = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
