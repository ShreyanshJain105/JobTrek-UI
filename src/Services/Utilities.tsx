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

export {formatDate,timeAgo};