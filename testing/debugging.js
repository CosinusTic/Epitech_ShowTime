function generateHash()
{
    const { createHash } = require('crypto');
    let date = new Date()
    let currentDate = date.getSeconds().toString()
    let access_token = createHash('sha256').update(currentDate).digest('hex');
    console.log("type: ", typeof(access_token));
    console.log("access token: ", access_token); 
}

let item;
function addToLocalStorageWithExpiry(duration)
{
    const token = "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35";
    let now = new Date().getTime();

    item = {
        access_token: token,
        expiry: now + duration
    }

}

function getLocalStorageItem()
{
    const now = new Date().getTime();

    if(now > item.expiry)
    {
        console.log("item has expired");
    }
    else
    {
        console.log("item has not expired");
    }
    console.log(item);
}



// addToLocalStorageWithExpiry(5000);

// setTimeout(getLocalStorageItem, 6000);

generateHash();


