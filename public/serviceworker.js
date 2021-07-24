const CACHE_NAME="version1"
const urlToCache = ['index.html', 'offline.html'];

const self=this
// installed
    self.addEventListener('install', (event)=>{
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache=>{
                    console.log('opened',cache)
                    return cache.addAll(urlToCache)
                })
        )
    })

//listen for request
self.addEventListener('fetch', (event)=>{
    // either could be online or offline
    console.log("fetching...")
    event.respondWith(
        caches.match(event.request)
            .then(()=>{
                return fetch(event.request)
                        .catch(()=>{
                            caches.match('offline.html')
                        })
            })
            
    )
        
    })


//Activate the SW
self.addEventListener('activate', ()=>{
        
})