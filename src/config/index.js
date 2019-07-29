export const server = {
    host: '192.168.15.2',
    ws_port: 9090,
    web_port: 8080
};

export const endpoint = `ws://${server.host}:${server.ws_port}`;

export const is_static = false;