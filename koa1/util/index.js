function switchTimeFormat (time) {
  const dateTime = new Date(time)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  return `${year}-${addZero(month)}`
};

function addZero (v) {
  return v < 10 ? '0' + v : v
}
module.exports = {
  switchTimeFormat
}
