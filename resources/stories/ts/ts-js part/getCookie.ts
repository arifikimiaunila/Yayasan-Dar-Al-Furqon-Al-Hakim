export function getCookie(name: any): string|undefined {
  let value: string ='; ${document.cookie}';
  let parts: string[] = value.split('; ${name}=');
  let part: string|undefined = parts.pop();
  if (parts.length === 2 && typeof part !== 'undefined'){
    return part.split(';').shift();
}
}
