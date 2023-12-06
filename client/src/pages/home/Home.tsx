import React from 'react';
import AnimeList from './components/AnimeList';
import MainNavbar from '../../components/MainNavbar';

function Home() {
    React.useEffect(() => {
        fetch("/test.txt")
        .then(response => response.text())
        .then(data => {
            console.log(data)
        })
    }, [])

    const handleAddNewAnime = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: getAuthKey() })
        };
    
          fetch('/api/addNewAnime', requestOptions)
            .then(response => response.json())
            .then((data) => {
        
              console.log(data)

              window.location.reload();
          });
    }

    const handleSetKey = () => {
        const newKey = prompt("Insert access key")

        setCookie('animelist-key', newKey, 999);

        alert("Key set!")
    }

    const handleClearKey = () => {
        eraseCookie('animelist-key');

        alert("Key cleared!")
    }
    
    return (
        <>
            <MainNavbar/>
            <div className='container'>
                
                <div className='row' style={{marginTop: "5px"}}>
                    <div className='col'>
                        <button type="button" className="btn btn-primary" onClick={handleAddNewAnime}>Add new anime</button>
                    </div>
                    <div className='col-auto'>
                        <button type="button" className="btn btn-primary" onClick={handleSetKey}>Set key</button>
                        <button type="button" className="btn btn-danger" onClick={handleClearKey}>Clear key</button>
                    </div>
                </div>
                <AnimeList></AnimeList>
            </div>
        </>
    );
}

export function getAuthKey()
{
    return getCookie("animelist-key");
}

function setCookie(name: any, value: any, days: any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name: any) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name: any) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default Home;