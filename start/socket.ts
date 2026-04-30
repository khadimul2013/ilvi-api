import SocketService from '#services/socket_service'

// Delay to ensure server is ready
setTimeout(() => {
    console.log('Initializing Socket after delay')
    SocketService.boot()
}, 100)