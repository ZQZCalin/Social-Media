// return time elapsed 
export default (date) => {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = Math.floor(seconds / 31556926);
  
    if (interval >= 1) {
      return interval + " year" + plural(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + plural(interval);
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + plural(interval);
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + plural(interval);
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + plural(interval);
    }
    return Math.floor(seconds) + " second" + plural(seconds);
}

function plural(interval) {
  return (interval >= 2) ? "s":"";
}