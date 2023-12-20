/**
 * 生成与给定背景色高对比度的颜色（黑白)
 * @param backgroundColor
 * @returns {string|string}
 */
export function autoHighContrastColor(backgroundColor){
  //原理参见:https://blog.walterlv.com/post/get-gray-reversed-color.html
  if(backgroundColor){
    const r = parseInt(backgroundColor.substring(1,3),16);
    const g = parseInt(backgroundColor.substring(3,5),16);
    const b = parseInt(backgroundColor.substring(5,7),16);
    const grayLevel = (0.299 * r+0.587*g+0.114*b)/255;
    return grayLevel > 0.5 ? '#000000' : '#FFFFFF';
  }else{
    return '#000000';
  }
}
