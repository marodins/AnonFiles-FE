const currentHost = window.location.hostname;
const config = {
    "protocol":currentHost=== 'localhost'? "ws://" : "wss://",
    "host":currentHost,
    "port":currentHost === 'localhost'? ':8080' : ''
};
export default config;