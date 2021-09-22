export default function getUrlPatch() {

  const pathName = window.location.pathname
  const newPathName = pathName.substring(pathName.indexOf('/catalog/') + 9)
  
  return newPathName
}
