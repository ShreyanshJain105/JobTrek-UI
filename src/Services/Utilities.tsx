const formatDate =(dateString:string)=>{
    const date = new Date(dateString);
    const options={year:"numeric" as const , month:'short' as const};
    return date.toLocaleString('en-US',options);
}
function timeAgo(time:string) {
  const now = new Date();
  const postDate=new Date(time);
  const diff = now.getTime() - postDate.getTime(); // difference in milliseconds
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

const getBase64=(file:any)=>{
        return new Promise((resolve,reject)=>{
            const reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>resolve(reader.result);
            reader.onerror=error=>reject(error);
        })
}
  
const formatInterviewTime=(dateStr:any)=>{
  const date = new Date(dateStr);

  return date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
});

} 

function openBase64File(base64String:string, fileType = "application/pdf") {
  // Decode base64 string
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob with the correct MIME type
  const blob = new Blob([byteArray], { type: fileType });

  // Create a URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Open in a new tab
  window.open(blobUrl, "_blank");
}


function timeAgoOrFromNow(time: string) {
  const now = new Date();
  const date = new Date(time);
  const diff = date.getTime() - now.getTime(); // positive if in future
  const absDiff = Math.abs(diff);

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const unit = (value: number, name: string) =>
    `${value} ${name}${value !== 1 ? "s" : ""}`;

  let result =
    seconds < 60
      ? unit(seconds, "second")
      : minutes < 60
      ? unit(minutes, "minute")
      : hours < 24
      ? unit(hours, "hour")
      : days < 30
      ? unit(days, "day")
      : months < 12
      ? unit(months, "month")
      : unit(years, "year");

  return diff >= 0 ? `in ${result}` : `${result} ago`;
}

export {formatDate,timeAgo,getBase64,formatInterviewTime,openBase64File,timeAgoOrFromNow};