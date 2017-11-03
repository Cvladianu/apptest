//Unused at the moment
var delEntry = document.getElementById('deleteEntry')


delEntry.addEventListener('click',function(){
    fetch('entries', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'entrynum': delEntry.value
        })
    })
    .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})
